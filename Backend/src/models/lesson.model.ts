import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Level } from './level.model';

export enum LessonType {
  LESSON = 'lesson',
  QUIZ = 'quiz',
}

@Table
export class Lesson extends Model<Lesson> {
  @Column({ allowNull: false, type: DataType.STRING })
  declare title: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  declare content: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
  declare order: number;

  @Column({
    allowNull: false,
    defaultValue: LessonType.LESSON,
    type: DataType.ENUM(...Object.values(LessonType)),
  })
  declare type: LessonType;

  @ForeignKey(() => Level)
  @Column({ type: DataType.INTEGER })
  declare levelId: number;

  @BelongsTo(() => Level)
  declare level: Level;
}