import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { QuestionBank } from './question_bank.model';

export enum QuestionCategory {
  WRITING = 'writing',
  READING = 'reading',
}

@Table
export class Question extends Model<Question> {
  @Column({ allowNull: false, type: DataType.STRING })
  declare type: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(QuestionCategory)),
  })
  declare category: string;

  @Column({ allowNull: false, type: DataType.TEXT })
  declare questionText: string;

  @Column({ allowNull: true, type: DataType.JSON })
  declare options: object;

  @Column({ allowNull: false, type: DataType.STRING })
  declare correctAnswer: string;

  @ForeignKey(() => QuestionBank)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare lessonId: number;

  @BelongsTo(() => QuestionBank)
  declare questionBank: QuestionBank;
}