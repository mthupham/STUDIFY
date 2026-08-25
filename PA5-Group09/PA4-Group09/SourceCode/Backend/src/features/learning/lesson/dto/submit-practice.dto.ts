import {
  IsNotEmpty,
  IsObject,
  IsOptional,
} from 'class-validator';

export class SubmitPracticeDto {
  @IsObject()
  @IsNotEmpty()
  answers!: Record<string, string>;

  @IsObject()
  @IsOptional()
  meta?: {
    startedAt?: string;
    completedAt?: string;
    durationSeconds?: number;
  };
}
