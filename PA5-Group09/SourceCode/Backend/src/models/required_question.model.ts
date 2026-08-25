import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { RequiredLevelTest } from './required_level_test.model';

@Table
export class RequiredQuestion extends Model<RequiredQuestion> {
  @Column({ allowNull: false, type: DataType.TEXT })
  declare questionText: string;

  @Column({ allowNull: true, type: DataType.JSON })
  declare options: object;

  @Column({ allowNull: false, type: DataType.STRING })
  declare correctAnswer: string;

  @Column({ allowNull: true, type: DataType.STRING })
  declare topic: string;

  @ForeignKey(() => RequiredLevelTest)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare levelId: number;

  @BelongsTo(() => RequiredLevelTest, { foreignKey: 'levelId' })
  declare requiredLevelTest: RequiredLevelTest;
}