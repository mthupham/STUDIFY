import { Column, DataType, Model, Table, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { VocabularyLesson } from './vocab_lesson.model';
import { GrammarLesson } from './grammar_lesson.model';
import { QuestionBank } from './question_bank.model';
import { RequiredLevelTest } from './required_level_test.model';
import { Roadmap } from './roadmap.model';

@Table
export class Level extends Model<Level> {
  @Column({ allowNull: false, type: DataType.STRING })
  declare levelTitle: string;

  @ForeignKey(() => Roadmap)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare roadmapId: number;

  @BelongsTo(() => Roadmap)
  declare roadmap: Roadmap;

  @HasMany(() => VocabularyLesson)
  declare vocabularyLessons: VocabularyLesson[];

  @HasMany(() => GrammarLesson)
  declare grammarLessons: GrammarLesson[];

  @HasMany(() => QuestionBank)
  declare questionBanks: QuestionBank[];

  @HasMany(() => RequiredLevelTest)
  declare requiredLevelTests: RequiredLevelTest[];
}