import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateFlashcardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  front!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  back!: string;
}