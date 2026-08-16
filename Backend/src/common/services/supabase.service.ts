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
      const uploadedFiles: Array<{ name: string; path: string; url: string }> =
        [];

      for (const file of files) {
        const result = await this.uploadFile(file, bucketName, path);

        if (!result.success) {
          // Immediately return the error so the controller can throw it
          return {
            success: false,
            error: result.error || `Failed to upload: ${file.originalname}`,
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
        error:
          error instanceof Error
            ? error.message
            : 'Download URL generation failed',
      };
    }
  }

  /**
   * Download a file as a buffer (server-side, no CORS issues)
   */
  async downloadFile(
    bucketName: string,
    path: string,
  ): Promise<{
    success: boolean;
    data?: Buffer;
    contentType?: string;
    error?: string;
  }> {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucketName)
        .download(path);

      if (error) return { success: false, error: error.message };

      // Convert Blob to Buffer
      const arrayBuffer = await data.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return {
        success: true,
        data: buffer,
        contentType: data.type || 'application/octet-stream',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Download failed',
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
      // Delete from Supabase Storage
      const { error: storageError } = await this.supabase.storage
        .from(bucketName)
        .remove([path]);

      if (storageError) {
        return {
          success: false,
          error: storageError.message,
        };
      }

      // Extract original stored filename
      const storedFileName = path.split('/').pop();

      if (storedFileName) {
        // Storage filename: 1786775305270-feature1_updated (1).txt
        // Metadata filename: feature1_updated (1).txt
        const originalFileName = storedFileName.replace(/^\d+-/, '');

        const { error: metadataError } = await this.supabase
          .from('file_metadata')
          .delete()
          .eq('file_name', originalFileName);

        if (metadataError) {
          console.error('Delete File Metadata Error:', metadataError);

          return {
            success: false,
            error: metadataError.message,
          };
        }
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Delete failed',
      };
    }
  }

/**
 * 1. Store/Upsert File Metadata into DB
 */
async saveFileMetadata(
  fileName: string,
  groupId: string,
  uploadedBy: string,
  fileSize: number,
) {
  const { error } = await this.supabase.from('file_metadata').upsert(
    {
      file_name: fileName,
      group_id: groupId,
      uploaded_by: uploadedBy,
      file_size: fileSize,
      uploaded_at: new Date().toISOString(),
    },
    { onConflict: 'group_id,file_name' }, // Ensures multi-group filename conflicts are prevented
  );

  if (error) {
    console.error('Save Metadata Error:', error);
    throw error;
  }
}

/**
 * 2. Get Metadata Map for group
 */
async getFileMetadata(groupId: string) {
  try {
    const { data, error } = await this.supabase
      .from('file_metadata')
      .select('file_name, uploaded_by, uploaded_at, file_size')
      .eq('group_id', groupId);

    if (error) throw error;

    // Convert rows array into key-value map keyed by file_name
    const metadata = (data || []).reduce((acc, row) => {
      acc[row.file_name] = {
        uploadedBy: row.uploaded_by,
        fileSize: row.file_size,
        uploadedAt: row.uploaded_at,
      };
      return acc;
    }, {} as Record<string, { uploadedBy: string; fileSize: number; uploadedAt: string }>);

    return { success: true, metadata };
  } catch (error) {
    console.error('Get File Metadata Error:', error);
    return { success: false, metadata: {} };
  }
}

/**
 * 3. List Storage files and merge DB metadata
 */
async listFiles(bucketName: string, path = '') {
  try {
    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .list(path, {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      });

    if (error) throw error;

    const groupIdMatch = path.match(/^groups\/([^/]+)\/files$/);
    const groupId = groupIdMatch ? groupIdMatch[1] : '';

    const metadataResult = groupId
      ? await this.getFileMetadata(groupId)
      : { success: false, metadata: {} };
    const metadataMap = metadataResult.metadata || {};

    const filesWithUrls = (data || [])
      .filter((item) => item.id !== null)
      .map((file) => {
        const filePath = path ? `${path}/${file.name}` : file.name;
        const { data: publicUrlData } = this.supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath);

        const fileMeta = metadataMap[file.name] || {};

        // Raw size from storage object metadata or fallback to file_metadata table size
        const rawSize = file.metadata?.size || fileMeta.fileSize || 0;
        const formattedSize = rawSize
          ? (rawSize / (1024 * 1024)).toFixed(1) + ' MB'
          : 'N/A';

        return {
          id: file.id,
          name: file.name,
          size: formattedSize,
          createdAt: file.created_at
            ? new Date(file.created_at).toISOString()
            : fileMeta.uploadedAt || new Date().toISOString(),
          uploadedBy: fileMeta.uploadedBy || 'Unknown User',
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
