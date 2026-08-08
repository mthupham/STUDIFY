import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

export enum LessonType {
  VOCABULARY = 'vocabulary',
  GRAMMAR = 'grammar',
}

@Table
export class UserProgress extends Model<UserProgress> {
  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  // Đổi từ INTEGER sang STRING để khớp với topic_id / grammar_id trong lesson.json (vd: "A1_T1", "A1_G1")
  @Column({ allowNull: false, type: DataType.STRING })
  declare lessonId: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(LessonType)),
  })
  declare lessonType: string;

  @Column({ allowNull: false, defaultValue: false, type: DataType.BOOLEAN })
  declare isCompleted: boolean;

  @Column({ allowNull: true, type: DataType.DATE })
  declare completedAt: Date;
}