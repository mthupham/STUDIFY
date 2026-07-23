import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { VocabularyItem } from './vocabulary-item.model';
import { GrammarItem } from './grammar-item.model';

@Table({ tableName: 'lessons', timestamps: true })
export class Lesson extends Model {
  @Column({ type: DataType.STRING, primaryKey: true })
  declare id: string; // VD: 'A1_T1', 'A1_G1'

  @Column({ type: DataType.STRING, allowNull: false })
  declare  level: string; // VD: 'A1', 'B2'

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string; // VD: 'Computer Hardware & Peripherals'

  @Column({ type: DataType.ENUM('vocabulary', 'grammar'), allowNull: false })
  declare type: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare order_index: number;

  @HasMany(() => VocabularyItem)
  declare vocabularyItems: VocabularyItem[];

  @HasMany(() => GrammarItem)
  declare grammarItems: GrammarItem[];
}