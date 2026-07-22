import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Lesson } from './lesson.model';

@Table({ tableName: 'grammar_items', timestamps: false })
export class GrammarItem extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Lesson)
  @Column({ type: DataType.STRING, allowNull: false })
  lesson_id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  rule: string; // VD: 'Verb (Base Form) + Object'

  @Column({ type: DataType.TEXT, allowNull: false })
  explanation: string;

  @Column({ type: DataType.JSON, allowNull: true })
  examples: string[]; // Mảng ví dụ: ["Click the button.", "Open the window."]

  @BelongsTo(() => Lesson)
  lesson: Lesson;
}