import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not configured');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Upload single file to Supabase storage
   */
  async uploadFile(
    file: Express.Multer.File,
    bucketName: string,
    path: string,
  ): Promise<{
    success: boolean;
    path?: string;
    url?: string;
    error?: string;
  }> {
    try {
      const filePath = path
        ? `${path}/${Date.now()}-${file.originalname}`
        : `${Date.now()}-${file.originalname}`;

      const { data, error } = await this.supabase.storage
        .from(bucketName)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) {
        return { success: false, error: error.message };
      }

      const { data: urlData } = this.supabase.storage
        .from(bucketName)
        .getPublicUrl(data.path);

      return {
        success: true,
        path: data.path,
        url: urlData.publicUrl,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  /**
   * Upload multiple files
   */
  async uploadFiles(
    files: Express.Multer.File[],
    bucketName: string,
    path: string,
  ): Promise<{
    success: boolean;
    files?: Array<{ name: string; path: string; url: string }>;
    error?: string;
  }> {
    try {
      const uploadedFiles: Array<{ name: string; path: string; url: string }> = [];

      for (const file of files) {
        const result = await this.uploadFile(file, bucketName, path);
        
        if (!result.success) {
          // Immediately return the error so the controller can throw it
          return { 
            success: false, 
            error: result.error || `Failed to upload: ${file.originalname}` 
          };
        }

        if (result.path && result.url) {
          uploadedFiles.push({
            name: file.originalname,
            path: result.path,
            url: result.url,
          });
        }
      }

      return {
        success: true,
        files: uploadedFiles,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  /**
   * Get signed download URL for private buckets
   */
  async getDownloadUrl(
    bucketName: string,
    path: string,
    expiresIn: number = 3600,
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucketName)
        .createSignedUrl(path, expiresIn);

      if (error) return { success: false, error: error.message };

      return { success: true, url: data.signedUrl };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Download URL generation failed',
      };
    }
  }

  /**
   * Delete file
   */
  async deleteFile(
    bucketName: string,
    path: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await this.supabase.storage
        .from(bucketName)
        .remove([path]);

      if (error) return { success: false, error: error.message };

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Delete failed',
      };
    }
  }

  /**
   * Save file upload metadata (uploader info) to the file_metadata table
   */
  async saveFileMetadata(
    fileName: string,
    groupId: string,
    uploadedBy: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await this.supabase
        .from('file_metadata')
        .upsert(
          {
            file_name: fileName,
            group_id: groupId,
            uploaded_by: uploadedBy,
            uploaded_at: new Date().toISOString(),
          },
          { onConflict: 'file_name' },
        );

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Save File Metadata Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save metadata',
      };
    }
  }

  /**
   * Get file upload metadata for a group
   */
  async getFileMetadata(groupId: string) {
    try {
      const { data, error } = await this.supabase
        .from('file_metadata')
        .select('file_name, uploaded_by, uploaded_at')
        .eq('group_id', groupId);

      if (error) throw error;

      const metadataMap: Record<string, { uploadedBy: string; uploadedAt: string }> = {};
      (data || []).forEach((item) => {
        metadataMap[item.file_name] = {
          uploadedBy: item.uploaded_by,
          uploadedAt: item.uploaded_at,
        };
      });

      return { success: true, metadata: metadataMap };
    } catch (error) {
      console.error('Get File Metadata Error:', error);
      return { success: false, metadata: {} };
    }
  }

  /**
   * List files in a bucket path with public URLs & metadata
   */
  async listFiles(bucketName: string, path = '') {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucketName)
        .list(path, { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

      if (error) throw error;

      // Extract groupId from path: "groups/{groupId}/files"
      const groupIdMatch = path.match(/^groups\/([^/]+)\/files$/);
      const groupId = groupIdMatch ? groupIdMatch[1] : '';

      // Fetch uploader metadata for this group
      const metadataResult = groupId
        ? await this.getFileMetadata(groupId)
        : { success: false, metadata: {} };
      const metadataMap = metadataResult.metadata || {};

      const filesWithUrls = (data || [])
        // Filter out folder placeholders created by Supabase
        .filter((item) => item.id !== null)
        .map((file) => {
          const filePath = path ? `${path}/${file.name}` : file.name;
          const { data: publicUrlData } = this.supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

          const sizeInMB = file.metadata?.size
            ? (file.metadata.size / (1024 * 1024)).toFixed(1) + ' MB'
            : 'N/A';

          // Get uploader metadata for this file
          const fileMeta = metadataMap[file.name] || {};

          return {
            id: file.id,
            name: file.name,
            size: sizeInMB,
            createdAt: file.created_at
              ? new Date(file.created_at).toISOString()
              : fileMeta.uploadedAt || 'Unknown',
            uploadedBy: fileMeta.uploadedBy || '',
            url: publicUrlData.publicUrl,
            mimetype: file.metadata?.mimetype || '',
          };
        });

      return { success: true, files: filesWithUrls };
    } catch (error) {
      console.error('List Files Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'List failed',
      };
    }
  }
}
