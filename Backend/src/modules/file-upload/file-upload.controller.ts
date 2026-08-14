import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Param,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../../common/services/supabase.service';
import { memoryStorage } from 'multer';
import type { Request } from 'express';

@Controller('api/files')
export class FileUploadController {
  private readonly bucketName: string;

  constructor(
    private readonly supabaseService: SupabaseService,
    configService: ConfigService,
  ) {
    this.bucketName = configService.get<string>('SUPABASE_BUCKET') || 'Uploads';
  }

  /**
   * Upload multiple files to a group
   * POST /api/files/upload/:groupId
   */
  @Post('upload/:groupId')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: memoryStorage(),
      limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit moved here
      fileFilter: (req, file, cb) => {
        const allowedMimes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'text/plain',
          'application/zip',
        ];

        if (!allowedMimes.includes(file.mimetype)) {
          return cb(new BadRequestException('File type not allowed'), false);
        }

        cb(null, true);
      },
    }),
  )
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('groupId') groupId: string,
    @Req() req: Request,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    const user = (req as any).user;
    const username = user?.username || user?.id || 'anonymous';
    const path = `groups/${groupId}/files`;

    const result = await this.supabaseService.uploadFiles(
      files,
      this.bucketName,
      path,
    );

    if (!result.success) {
      throw new BadRequestException(result.error || 'Upload failed');
    }

    // Save uploader metadata for each uploaded file
    const uploadedFiles = result.files ?? [];
    for (const file of uploadedFiles) {
      await this.supabaseService.saveFileMetadata(
        file.name,
        groupId,
        username,
      );
    }

    return {
      success: true,
      message: `Successfully uploaded ${uploadedFiles.length} file(s)`,
      files: uploadedFiles.map((file) => ({
        name: file.name,
        url: file.url,
        uploadedBy: username,
        uploadedAt: new Date(),
      })),
    };
  }

  /**
   * Get signed download URL for a file
   * GET /api/files/download/:groupId/:fileName
   */
  @Get('download/:groupId/:fileName')
  @HttpCode(HttpStatus.OK)
  async getDownloadUrl(
    @Param('groupId') groupId: string,
    @Param('fileName') fileName: string,
  ) {
    const path = `groups/${groupId}/files/${fileName}`;
    const result = await this.supabaseService.getDownloadUrl(this.bucketName, path);

    if (!result.success) {
      throw new BadRequestException(
        result.error || 'Failed to generate download URL',
      );
    }

    return {
      success: true,
      downloadUrl: result.url,
    };
  }

  /**
   * Proxy download: fetch file from Supabase server-side and stream to client
   * GET /api/files/download-file/:groupId/:fileName
   */
  @Get('download-file/:groupId/:fileName')
  @HttpCode(HttpStatus.OK)
  async proxyDownload(
    @Param('groupId') groupId: string,
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ) {
    const decodedFileName = decodeURIComponent(fileName);
    const path = `groups/${groupId}/files/${decodedFileName}`;

    const result = await this.supabaseService.downloadFile(this.bucketName, path);

    if (!result.success || !result.data) {
      throw new BadRequestException(
        result.error || 'Failed to download file',
      );
    }

    // Clean original name (strip timestamp prefix like "1723680000-")
    const cleanFileName = decodedFileName.replace(/^\d+-/, '');

    const ext = cleanFileName.split('.').pop()?.toLowerCase() || '';
    const mimeMap: Record<string, string> = {
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      txt: 'text/plain',
      zip: 'application/zip',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      mp4: 'video/mp4',
    };

    const contentType = result.contentType || mimeMap[ext] || 'application/octet-stream';

    res.setHeader('Content-Type', contentType);
    // Explicitly set Attachment with clean filename
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(cleanFileName)}"`,
    );
    res.setHeader('Content-Length', result.data.length);
    res.send(result.data);
  }

  /**
   * List all files in a group
   * GET /api/files/list/:groupId
   */
  @Get('list/:groupId')
  @HttpCode(HttpStatus.OK)
  async listGroupFiles(@Param('groupId') groupId: string) {
    const path = `groups/${groupId}/files`;
    const result = await this.supabaseService.listFiles(this.bucketName, path);

    if (!result.success) {
      throw new BadRequestException(result.error || 'Failed to list files');
    }

    return {
      success: true,
      files: result.files,
    };
  }

  /**
   * List all files in the root of 'Uploads' bucket
   * GET /api/files/list
   */
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async listAllFiles() {
    const result = await this.supabaseService.listFiles(this.bucketName, '');

    if (!result.success) {
      return { success: false, files: [] };
    }

    return {
      success: true,
      files: result.files,
    };
  }
}