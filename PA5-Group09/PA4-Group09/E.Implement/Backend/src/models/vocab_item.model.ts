import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { VocabularyLesson } from './vocab_lesson.model';

@Table
export class VocabularyItem extends Model<VocabularyItem> {
  @Column({ allowNull: false, type: DataType.STRING })
  declare term: string;

  @Column({ allowNull: true, type: DataType.STRING })
  declare phonetic: string;

  @Column({ allowNull: false, type: DataType.TEXT })
  declare definition: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  declare exampleSentence: string;

  @ForeignKey(() => VocabularyLesson)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare topicId: number;

  @BelongsTo(() => VocabularyLesson)
  declare vocabularyLesson: VocabularyLesson;
}