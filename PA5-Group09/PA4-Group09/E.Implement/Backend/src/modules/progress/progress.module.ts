import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { UserProgress } from '../../models/user_progress.model';
import { VocabularyLesson } from '../../models/vocab_lesson.model';
import { GrammarLesson } from '../../models/grammar_lesson.model';

@Module({
  imports: [SequelizeModule.forFeature([UserProgress, VocabularyLesson, GrammarLesson])],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}