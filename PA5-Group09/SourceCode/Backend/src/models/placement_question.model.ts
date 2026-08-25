import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { PlacementTest } from './placement_test.model';

@Table
export class PlacementQuestion extends Model<PlacementQuestion> {
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare questionNumber: number;

  @Column({ allowNull: false, type: DataType.STRING })
  declare level: string;

  @Column({ allowNull: false, type: DataType.TEXT })
  declare question: string;

  @Column({ allowNull: true, type: DataType.JSON })
  declare options: object;

  @Column({ allowNull: false, type: DataType.STRING })
  declare correctAnswer: string;

  @ForeignKey(() => PlacementTest)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare testTitleId: number;

  @BelongsTo(() => PlacementTest)
  declare placementTest: PlacementTest;
}