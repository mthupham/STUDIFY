import { IsNotEmpty, IsObject, IsOptional, IsNumber } from 'class-validator';

export class SubmitTestDto {
  @IsNotEmpty()
  @IsObject()
  answers!: Record<number, string>;

  @IsOptional()
  @IsNumber()
  weeklyStudyHours?: number;
}