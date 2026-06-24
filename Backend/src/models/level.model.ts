import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Roadmap } from './roadmap.model';
import { Lesson } from './lesson.model';

@Table
export class Level extends Model<Level> {
  @Column({ allowNull: false, type: DataType.STRING })
  declare name: string; // A1, A2, B1...

  @Column({ allowNull: false, type: DataType.INTEGER })
  declare order: number; // 1, 2, 3...

  @ForeignKey(() => Roadmap)
  @Column({ type: DataType.INTEGER })
  declare roadmapId: number;

  @BelongsTo(() => Roadmap)
  declare roadmap: Roadmap;

  @HasMany(() => Lesson)
  declare lessons: Lesson[];
}