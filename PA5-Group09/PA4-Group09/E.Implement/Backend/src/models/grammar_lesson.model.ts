import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Level } from './level.model';
import { GrammarExample } from './grammar_example.model';

@Table
export class GrammarLesson extends Model<GrammarLesson> {
  @Column({ allowNull: false, type: DataType.STRING })
  declare grammarTitle: string;

  @Column({ allowNull: false, type: DataType.TEXT })
  declare rule: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  declare explanation: string;

  @ForeignKey(() => Level)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare levelId: number;

  @BelongsTo(() => Level)
  declare level: Level;

  @HasMany(() => GrammarExample)
  declare grammarExamples: GrammarExample[];
}