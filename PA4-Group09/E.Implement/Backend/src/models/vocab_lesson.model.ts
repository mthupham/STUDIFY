import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Level } from './level.model';
import { VocabularyItem } from './vocab_item.model';

@Table
export class VocabularyLesson extends Model<VocabularyLesson> {
  @Column({ allowNull: false, type: DataType.STRING })
  declare topicName: string;

  @ForeignKey(() => Level)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare levelId: number;

  @BelongsTo(() => Level)
  declare level: Level;

  @HasMany(() => VocabularyItem)
  declare vocabularyItems: VocabularyItem[];
}