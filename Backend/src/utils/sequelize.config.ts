import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { PlacementTest } from '../models/placement_test.model';
import { PlacementQuestion } from '../models/placement_question.model';
import { RequiredLevelTest } from '../models/required_level_test.model';
import { RequiredQuestion } from '../models/required_question.model';
import { Question } from '../models/question.model';
import { QuestionBank } from '../models/question_bank.model';
import { GrammarExample } from '../models/grammar_example.model';
import { GrammarLesson } from '../models/grammar_lesson.model';
import { VocabularyItem } from '../models/vocab_item.model';
import { VocabularyLesson } from '../models/vocab_lesson.model';
import { Level } from '../models/level.model';
import { Roadmap } from '../models/roadmap.model';
import { UserProgress } from '../models/user_progress.model';
import { PlacementTestResult } from '@/models/placement_test_result.model';
import { PlacementTestQuestion } from '@/models/placement_test_question.model';
import { Message } from '@/models/message.model';
import { Notification } from '../models/notification.model';

export const sequelizeConfig = (configService: ConfigService): SequelizeModuleOptions => ({
  dialect: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT') ? Number(configService.get<number>('DB_PORT')) : 5432,
  username: configService.get<string>('DB_USERNAME') ?? configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  models: [
    User, Level, VocabularyLesson, VocabularyItem,
    GrammarLesson, GrammarExample, QuestionBank, Question, Roadmap,
    PlacementTest, PlacementQuestion, RequiredLevelTest, RequiredQuestion,
    UserProgress, PlacementTestQuestion, PlacementTestResult, Message, Notification
  ],  
  sync: { force: false, alter: true },
  autoLoadModels: true,
  synchronize: true,
  logging: false,
});