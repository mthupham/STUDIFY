import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Lesson } from './lesson.model';

@Table({ tableName: 'vocabulary_items', timestamps: false })
export class VocabularyItem extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Lesson)
  @Column({ type: DataType.STRING, allowNull: false })
  lesson_id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  term: string; // VD: 'Monitor'

  @Column({ type: DataType.STRING, allowNull: true })
  phonetic: string; // VD: '/ˈmɒn.ɪ.tər/'

  @Column({ type: DataType.TEXT, allowNull: false })
  definition: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  example_sentence: string;

  @BelongsTo(() => Lesson)
  lesson: Lesson;
}