import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { GrammarLesson } from './grammar_lesson.model';

@Table
export class GrammarExample extends Model<GrammarExample> {
  @Column({ allowNull: false, type: DataType.TEXT })
  declare exampleText: string;

  @ForeignKey(() => GrammarLesson)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare grammarId: number;

  @BelongsTo(() => GrammarLesson)
  declare grammarLesson: GrammarLesson;
}