import { Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'placement_test_questions', timestamps: true })
export class PlacementTestQuestion extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  questionText: string;

  @Column({ type: DataType.JSONB, allowNull: false })
  options: { key: string; text: string }[];

  @Column({ type: DataType.STRING, allowNull: false })
  correctAnswer: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  explanation: string;

  @Column({ type: DataType.STRING, defaultValue: 'GENERAL' })
  category: string;
}