import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { StudyGroup } from "./study_group.model";
import { User } from "./user.model";

export enum GroupMemberRole {
  LEADER = "LEADER",
  MEMBER = "MEMBER",
}

@Table({
  tableName: "GroupMembers",
  timestamps: false,
})
export class GroupMember extends Model {
  @ForeignKey(() => StudyGroup)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    field: "groupId",
  })
  declare groupId: number;

  @BelongsTo(() => StudyGroup)
  declare group: StudyGroup;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    field: "userId",
  })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @Column({
    allowNull: false,
    defaultValue: GroupMemberRole.MEMBER,
    type: DataType.STRING(20),
  })
  declare role: GroupMemberRole;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "joinedAt",
  })
  declare joinedAt: Date;
}