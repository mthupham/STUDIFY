import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AnalyzeSpeakingDto {
  @ApiProperty({
    example:
      'I am responsible for manage the database.',
  })
  @IsString()
  @IsNotEmpty()
  transcript!: string;

  @ApiProperty({
    example: 'technical',
  })
  @IsString()
  @IsNotEmpty()
  scenario!: string;
}