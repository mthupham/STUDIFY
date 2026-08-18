import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class JoinGroupDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10)
  code!: string;
}