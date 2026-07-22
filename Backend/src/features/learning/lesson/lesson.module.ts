import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { Lesson } from './models/lesson.model';
import { VocabularyItem } from './models/vocabulary-item.model';
import { GrammarItem } from './models/grammar-item.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Lesson, VocabularyItem, GrammarItem]),
  ],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {}