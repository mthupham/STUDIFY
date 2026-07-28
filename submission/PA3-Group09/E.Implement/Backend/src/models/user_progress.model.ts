import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

export enum LessonType {
  VOCABULARY = 'vocabulary',
  GRAMMAR = 'grammar',
}

@Table
export class UserProgress extends Model<UserProgress> {
  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  // id của VocabularyLesson hoặc GrammarLesson, tùy theo lessonType
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare lessonId: number;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(LessonType)),
  })
  declare lessonType: string;

  @Column({ allowNull: false, defaultValue: false, type: DataType.BOOLEAN })
  declare isCompleted: boolean;

  @Column({ allowNull: true, type: DataType.DATE })
  declare completedAt: Date;
}