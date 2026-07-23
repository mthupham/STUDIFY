import { Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'placement_test_results', timestamps: true })
export class PlacementTestResult extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.UUID, allowNull: true })
  userId: string; // ID người dùng (nếu có Auth)

  @Column({ type: DataType.INTEGER, allowNull: false })
  scorePercentage: number; // Điểm quy ra % (VD: 80%)

  @Column({ type: DataType.INTEGER, allowNull: false })
  totalQuestions: number; // Tổng số câu

  @Column({ type: DataType.INTEGER, allowNull: false })
  correctAnswersCount: number; // Số câu làm đúng

  @Column({ type: DataType.STRING, allowNull: false })
  levelAssigned: string; // BEGINNER | INTERMEDIATE | ADVANCED

  @Column({ type: DataType.JSONB, allowNull: false })
  answersDetail: any; // Chi tiết từng câu (đúng/sai, lời giải)
}