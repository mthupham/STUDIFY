import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'decks',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Deck extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_id',
  })
  declare userId: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string | null;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    defaultValue: 'General',
  })
  declare category: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    defaultValue: 'bg-blue-600',
  })
  declare color: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'progress_color',
    defaultValue: 'bg-sky-700',
  })
  declare progressColor: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: 'is_public',
    defaultValue: false,
  })
  declare isPublic: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'last_studied_at',
  })
  declare lastStudiedAt: Date | null;
}