import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateMasteryDto {
  @IsBoolean()
  @IsNotEmpty()
  isMastered!: boolean;
}