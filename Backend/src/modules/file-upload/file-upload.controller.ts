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
} from '@nestjs/common';
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