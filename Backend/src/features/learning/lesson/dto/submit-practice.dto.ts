import {
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
} from 'class-validator';

export class SubmitPracticeDto {
  @IsIn(['reading', 'writing'])
  skill!: 'reading' | 'writing';

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
