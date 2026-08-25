import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'messages', timestamps: true })
export class Message extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  declare groupId: string; // tạm là chuỗi test bây giờ, sau này là StudyGroup.id thật

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare senderId: number;

  @BelongsTo(() => User)
  declare sender: User;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare text: string;
}