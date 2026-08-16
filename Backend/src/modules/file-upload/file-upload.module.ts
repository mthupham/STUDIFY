import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { SupabaseService } from '../../common/services/supabase.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [FileUploadController],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class FileUploadModule {}