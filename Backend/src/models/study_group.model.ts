import {
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "StudyGroups",
  timestamps: true,
})
export class StudyGroup extends Model {
  @Column({
    allowNull: false,
    type: DataType.STRING(100),
  })
  declare name: string;

  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING(10),
  })
  declare code: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    field: "createdBy",
  })
  declare createdBy: number;
}