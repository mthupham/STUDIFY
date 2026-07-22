import { Column, DataType, Model, Table, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { RequiredQuestion } from './required_question.model';
import { Level } from './level.model';

@Table
export class RequiredLevelTest extends Model<RequiredLevelTest> {
  @Column({ allowNull: false, type: DataType.STRING })
  declare name: string;

  @ForeignKey(() => Level)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare levelId: number;

  @BelongsTo(() => Level)
  declare level: Level;

  @HasMany(() => RequiredQuestion, { foreignKey: 'levelId' })
  declare requiredQuestions: RequiredQuestion[];
}