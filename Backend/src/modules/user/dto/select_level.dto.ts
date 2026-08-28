import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class SelectLevelDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'])
  level!: string;
}