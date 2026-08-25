import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { PlacementQuestion } from './placement_question.model';

@Table
export class PlacementTest extends Model<PlacementTest> {
  @Column({ allowNull: false, type: DataType.STRING })
  declare testTitle: string;

  @HasMany(() => PlacementQuestion)
  declare placementQuestions: PlacementQuestion[];
}