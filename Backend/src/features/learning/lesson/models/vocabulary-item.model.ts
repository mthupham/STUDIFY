import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Lesson } from './lesson.model';

@Table({ tableName: 'vocabulary_items', timestamps: false })
export class VocabularyItem extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Lesson)
  @Column({ type: DataType.STRING, allowNull: false })
  declare lesson_id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare term: string; // VD: 'Monitor'

  @Column({ type: DataType.STRING, allowNull: true })
  declare phonetic: string; // VD: '/ˈmɒn.ɪ.tər/'

  @Column({ type: DataType.TEXT, allowNull: false })
  declare definition: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare example_sentence: string;

  @BelongsTo(() => Lesson)
  declare lesson: Lesson;
}