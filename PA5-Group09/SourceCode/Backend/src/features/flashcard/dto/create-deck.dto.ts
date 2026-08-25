import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateDeckDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  declare title: string;

  @IsOptional()
  @IsString()
  declare description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  declare category?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  declare color?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  declare progressColor?: string;

  @IsOptional()
  @IsBoolean()
  declare isPublic?: boolean;
}