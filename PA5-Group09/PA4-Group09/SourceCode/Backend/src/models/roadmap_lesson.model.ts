import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { RoadmapLevel } from './roadmap_level.model';

@Table({ tableName: 'roadmap_lessons', timestamps: false })
export class RoadmapLesson extends Model {
  @Column({ type: DataType.STRING, primaryKey: true })
  declare lesson_id: string; // 'A1_T1', 'A1_G1', ...

  @ForeignKey(() => RoadmapLevel)
  @Column({ type: DataType.STRING, allowNull: false })
  declare level: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare topic_name: string; // 'Computer Hardware', ...

  @Column({ type: DataType.ENUM('vocabulary', 'grammar'), allowNull: false })
  declare type: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare order_index: number;

  @BelongsTo(() => RoadmapLevel)
  declare levelDetail: RoadmapLevel;
}