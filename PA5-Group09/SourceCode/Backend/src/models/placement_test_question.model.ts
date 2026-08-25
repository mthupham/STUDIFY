import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'PlacementTestQuestions' })
export class PlacementTestQuestion extends Model<PlacementTestQuestion> {
  @Column({ allowNull: false, type: DataType.TEXT })
  declare questionText: string;

  @Column({ allowNull: false, type: DataType.JSON })
  declare options: object; // { A: '...', B: '...', C: '...', D: '...' }

  @Column({ allowNull: false, type: DataType.STRING })
  declare correctAnswer: string; // 'A' | 'B' | 'C' | 'D'

  @Column({ allowNull: true, type: DataType.STRING })
  declare category: string; // level: 'A1', 'A2', 'B1'...

  @Column({ allowNull: true, type: DataType.TEXT })
  declare explanation: string;
}