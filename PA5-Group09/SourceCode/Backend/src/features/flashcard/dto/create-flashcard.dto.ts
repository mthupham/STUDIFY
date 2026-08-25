import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateFlashcardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  front!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  back!: string;
}