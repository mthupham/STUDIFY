import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'PlacementTestResults' })
export class PlacementTestResult extends Model<PlacementTestResult> {
  @ForeignKey(() => User)
  @Column({ allowNull: true, type: DataType.INTEGER })
  declare userId: number | null;  

  @BelongsTo(() => User)
  declare user: User;

  @Column({ allowNull: false, type: DataType.INTEGER })
  declare scorePercentage: number;

  @Column({ allowNull: false, type: DataType.INTEGER })
  declare totalQuestions: number;

  @Column({ allowNull: false, type: DataType.INTEGER })
  declare correctAnswersCount: number;

  @Column({ allowNull: false, type: DataType.STRING })
  declare levelAssigned: string; // 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'

  @Column({ allowNull: true, type: DataType.JSON })
  declare answersDetail: object;
}