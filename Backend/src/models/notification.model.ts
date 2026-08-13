import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

export enum NotificationType {
  LESSON_INCOMPLETE = 'LESSON_INCOMPLETE', // Chưa hoàn thành lesson hiện tại
  LESSON_UNLOCKED = 'LESSON_UNLOCKED',     // Có bài mới được mở khóa
}

@Table({ tableName: 'Notifications' })
export class Notification extends Model<Notification> {
  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(NotificationType)),
  })
  declare type: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare title: string;

  @Column({ allowNull: false, type: DataType.TEXT })
  declare message: string;

  @Column({ allowNull: true, type: DataType.STRING })
  declare lessonId: string; // ID bài học liên quan (nếu có)

  @Column({ allowNull: false, defaultValue: false, type: DataType.BOOLEAN })
  declare isRead: boolean;
}