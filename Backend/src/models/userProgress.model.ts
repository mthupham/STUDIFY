import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';
import { Lesson } from './lesson.model';

@Table({ tableName: 'UserProgresses' })
export class UserProgress extends Model<UserProgress> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  declare userId: number;

  @ForeignKey(() => Lesson)
  @Column({ type: DataType.INTEGER })
  declare lessonId: number;

  @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: false })
  declare completed: boolean;

  @Column({ allowNull: true, type: DataType.DATE })
  declare completedAt: Date;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Lesson)
  declare lesson: Lesson;
}