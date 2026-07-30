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

  // moi them
  // level.model.ts
@Column({ allowNull: false, type: DataType.STRING, unique: true })
declare code: string; // 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'

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