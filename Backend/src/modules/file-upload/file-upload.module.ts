import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { SupabaseService } from '../../common/services/supabase.service';

@Module({
  controllers: [FileUploadController],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class FileUploadModule {}
