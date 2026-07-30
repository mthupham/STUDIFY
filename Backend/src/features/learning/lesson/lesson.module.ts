import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { UserProgress } from '../../../models/user_progress.model';

@Module({
  imports: [SequelizeModule.forFeature([UserProgress])],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {}