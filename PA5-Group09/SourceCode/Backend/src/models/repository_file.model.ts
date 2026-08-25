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

@Table({
  tableName: "RepositoryFiles",
  timestamps: true,
})
export class RepositoryFile extends Model<RepositoryFile> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => StudyGroup)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "groupId",
  })
  declare groupId: number;

  @BelongsTo(() => StudyGroup)
  declare group: StudyGroup;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "uploadedBy",
  })
  declare uploadedBy: number;

  @BelongsTo(() => User)
  declare uploader: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "fileName",
  })
  declare fileName: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: "storagePath",
  })
  declare storagePath: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "mimeType",
  })
  declare mimeType: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: "fileSize",
  })
  declare fileSize: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}