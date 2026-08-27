import { IsInt, Min, Max, IsOptional, IsString } from 'class-validator';

export class UpdateOnboardingDto {
  @IsInt()
  @Min(1)
  @Max(168)
  weeklyStudyHours!: number;

  @IsOptional()
  @IsString()
  currentLevel?: string;
}