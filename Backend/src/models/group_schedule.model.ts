import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'GroupSchedules',
  timestamps: true,
})
export class GroupSchedule extends Model {
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare groupId: number;

  @Column({
    allowNull: false,
    type: DataType.STRING(150),
  })
  declare title: string;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  declare description: string | null;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  declare startAt: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  declare endAt: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
  })
  declare locationOrLink: string | null;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare createdBy: number;
}