import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { RoadmapLesson } from './roadmap-lesson.model';

@Table({ tableName: 'roadmap_levels', timestamps: false })
export class RoadmapLevel extends Model {
  @Column({ type: DataType.STRING, primaryKey: true })
  level: string; // 'A1', 'A2', 'B1', ...

  @Column({ type: DataType.STRING, allowNull: false })
  level_title: string; // 'BREAKTHROUGH', 'WAYSTAGE', ...

  @HasMany(() => RoadmapLesson)
  lessons: RoadmapLesson[];
}