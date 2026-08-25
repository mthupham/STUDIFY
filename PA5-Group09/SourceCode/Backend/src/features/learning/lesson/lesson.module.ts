import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { UserProgress } from '../../../models/user_progress.model';
import { UserModule } from '../../../modules/user/user.module';
import { NotificationModule } from '@/modules/notification/notification.module';
@Module({
  imports: [SequelizeModule.forFeature([UserProgress]), UserModule, NotificationModule],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {}