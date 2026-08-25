import { IsInt, Min, Max } from 'class-validator';

export class UpdateOnboardingDto {
  @IsInt()
  @Min(1)
  @Max(168)
  weeklyStudyHours!: number;
}