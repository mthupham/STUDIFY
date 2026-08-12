import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User } from './user.model';
import { GroupMember } from './group_member.model';

@Table({
  tableName: 'StudyGroups',
})
export class StudyGroup extends Model<StudyGroup> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'books',
  })
  declare icon: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    unique: true,
  })
  declare code: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare createdBy: number;

  @BelongsTo(() => User)
  declare creator: User;

  @HasMany(() => GroupMember)
  declare members: GroupMember[];
}