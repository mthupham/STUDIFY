import {
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

export enum GroupMemberRole {
  LEADER = "LEADER",
  MEMBER = "MEMBER",
}

@Table({
  tableName: "GroupMembers",
  timestamps: false,
})
export class GroupMember extends Model {
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    field: "groupId",
  })
  declare groupId: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    field: "userId",
  })
  declare userId: number;

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