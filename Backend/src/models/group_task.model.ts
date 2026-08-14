import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

export enum GroupTaskStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum GroupTaskCategory {
  ESSAY = 'ESSAY',
  PHONETICS = 'PHONETICS',
  VOCABULARY = 'VOCABULARY',
  GRAMMAR = 'GRAMMAR',
}

@Table({
  tableName: 'GroupTasks',
  timestamps: true,
})
export class GroupTask extends Model {
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
    type: DataType.STRING(30),
  })
  declare category: GroupTaskCategory;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare assignedTo: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare createdBy: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
  declare startAt: Date | null;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  declare dueAt: Date;

  @Column({
    allowNull: false,
    type: DataType.STRING(30),
    defaultValue: GroupTaskStatus.NOT_STARTED,
  })
  declare status: GroupTaskStatus;

  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
  declare completedAt: Date | null;

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare isHidden: boolean;
}