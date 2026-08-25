import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Level } from './level.model';

@Table
export class Roadmap extends Model<Roadmap> {
  @Column({ allowNull: false, type: DataType.STRING })
  declare title: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  declare description: string;

  @HasMany(() => Level)
  declare levels: Level[];
}

