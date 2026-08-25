import { IsNotEmpty, IsObject, IsOptional, IsNumber } from 'class-validator';

export class SubmitPlacementTestDto {
  @IsNotEmpty()
  @IsObject()
  answers!: Record<number, string>;

  @IsOptional()
  @IsNumber()
  weeklyStudyHours?: number;
}