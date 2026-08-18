
import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'flashcards',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Flashcard extends Model {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'deck_id',
  })
  declare deckId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare front: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare back: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: 'is_mastered',
    defaultValue: false,
  })
  declare isMastered: boolean;
}