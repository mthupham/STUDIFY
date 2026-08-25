import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'lessons', timestamps: true })
export class Lesson extends Model {
  @Column({ type: DataType.STRING, primaryKey: true })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare level: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.ENUM('vocabulary', 'grammar'), allowNull: false })
  declare type: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare order_index: number;
}