import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Level } from './level.model';
import { Question } from './question.model';

@Table
export class QuestionBank extends Model<QuestionBank> {
  @Column({ allowNull: false, type: DataType.STRING })
  declare topic: string;

  @ForeignKey(() => Level)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare levelId: number;

  @BelongsTo(() => Level)
  declare level: Level;

  @HasMany(() => Question)
  declare questions: Question[];
}