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
  Delete,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { SupabaseService } from '../../common/services/supabase.service';
import { memoryStorage } from 'multer';
import { JwtGuard } from '../auth/guards/jwt.guard';
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
  @UseGuards(JwtGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: memoryStorage(),
      limits: { fileSize: 2 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowedMimes = [
          // Images
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
          'image/svg+xml',
          'image/bmp',
          'image/x-icon',
          // Documents
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'text/plain',
          'text/csv',
          'text/markdown',
          'application/rtf',
          // Video
          'video/mp4',
          'video/webm',
          'video/quicktime',
          'video/x-msvideo',
          'video/x-matroska',
          // Audio
          'audio/mpeg',
          'audio/wav',
          'audio/x-wav',
          'audio/ogg',
          'audio/mp4',
          'audio/aac',
          // Archives
          'application/zip',
          'application/x-rar-compressed',
          'application/x-7z-compressed',
          'application/x-tar',
          'application/gzip',
          // Code & Data
          'application/json',
          'application/xml',
          'application/javascript',
          'text/html',
          'text/css',
          'text/javascript',
          'text/x-python',
          'text/x-java-source',
          'text/x-c',
          'text/x-c++',
          'text/x-ruby',
          'text/x-php',
          'text/x-sh',
        ];

        const allowedExtensions = [
          // Images
          '.jpg',
          '.jpeg',
          '.png',
          '.gif',
          '.webp',
          '.svg',
          '.bmp',
          '.ico',
          // Documents
          '.pdf',
          '.doc',
          '.docx',
          '.xls',
          '.xlsx',
          '.ppt',
          '.pptx',
          '.txt',
          '.csv',
          '.md',
          '.rtf',
          // Video
          '.mp4',
          '.webm',
          '.mov',
          '.avi',
          '.mkv',
          // Audio
          '.mp3',
          '.wav',
          '.ogg',
          '.m4a',
          '.aac',
          // Archives
          '.zip',
          '.rar',
          '.7z',
          '.tar',
          '.gz',
          // Code & Data
          '.json',
          '.xml',
          '.js',
          '.html',
          '.css',
          '.py',
          '.java',
          '.c',
          '.cpp',
          '.rb',
          '.php',
          '.sh',
        ];

        // Some browsers report inconsistent MIME types for Office files
        // (e.g. .docx/.xlsx/.pptx may come through as application/zip or
        // application/octet-stream). Validate by extension as a fallback.
        const ext = file.originalname.split('.').pop()?.toLowerCase() || '';
        const isAllowedMime = allowedMimes.includes(file.mimetype);
        const isAllowedExt = allowedExtensions.includes(`.${ext}`);

        if (!isAllowedMime && !isAllowedExt) {
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
    // Debug log: Check your NestJS terminal to see the EXACT structure of req.user
console.log('Decoded JWT user payload:', user);

const username =
  user?.username ||
  user?.name ||
  user?.full_name ||
  user?.fullName ||
  user?.email?.split('@')[0] ||
  user?.sub ||
  'anonymous';
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
  // file.path is "groups/{groupId}/files/1723...-phuc_2.4.png"
  const storedFileName = file.path.split('/').pop() || file.name;
  await this.supabaseService.saveFileMetadata(storedFileName, groupId, username);
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
    const result = await this.supabaseService.getDownloadUrl(
      this.bucketName,
      path,
    );

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

    const result = await this.supabaseService.downloadFile(
      this.bucketName,
      path,
    );

    if (!result.success || !result.data) {
      throw new BadRequestException(result.error || 'Failed to download file');
    }

    // Clean original name (strip timestamp prefix like "1723680000-")
    const cleanFileName = decodedFileName.replace(/^\d+-/, '');

    const ext = cleanFileName.split('.').pop()?.toLowerCase() || '';
    const mimeMap: Record<string, string> = {
      // Images
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
      bmp: 'image/bmp',
      ico: 'image/x-icon',
      // Documents
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ppt: 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      txt: 'text/plain',
      csv: 'text/csv',
      md: 'text/markdown',
      rtf: 'application/rtf',
      // Video
      mp4: 'video/mp4',
      webm: 'video/webm',
      mov: 'video/quicktime',
      avi: 'video/x-msvideo',
      mkv: 'video/x-matroska',
      // Audio
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      ogg: 'audio/ogg',
      m4a: 'audio/mp4',
      aac: 'audio/aac',
      // Archives
      zip: 'application/zip',
      rar: 'application/x-rar-compressed',
      '7z': 'application/x-7z-compressed',
      tar: 'application/x-tar',
      gz: 'application/gzip',
      // Code & Data
      json: 'application/json',
      xml: 'application/xml',
      js: 'application/javascript',
      html: 'text/html',
      css: 'text/css',
      py: 'text/x-python',
      java: 'text/x-java-source',
      c: 'text/x-c',
      cpp: 'text/x-c++',
      rb: 'text/x-ruby',
      php: 'text/x-php',
      sh: 'text/x-sh',
    };

    const contentType =
      result.contentType || mimeMap[ext] || 'application/octet-stream';

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

  @Delete(':groupId/:fileName')
  @HttpCode(HttpStatus.OK)
  async deleteFile(
    @Param('groupId') groupId: string,
    @Param('fileName') fileName: string,
  ) {
    const decodedFileName = decodeURIComponent(fileName);

    const path = `groups/${groupId}/files/${decodedFileName}`;

    const result = await this.supabaseService.deleteFile(this.bucketName, path);

    if (!result.success) {
      throw new BadRequestException(result.error || 'Failed to delete file');
    }

    return {
      success: true,
      message: 'File deleted successfully',
      fileName: decodedFileName,
    };
  }
}
