import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateGroupDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  description?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  icon?: string;
}
