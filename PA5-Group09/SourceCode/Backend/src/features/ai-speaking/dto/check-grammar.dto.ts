import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CheckGrammarDto {
  @ApiProperty({
    example: 'I am responsible for manage the database.',
    description: 'English text to check for grammar errors',
  })
  @IsString()
  @IsNotEmpty()
  text!: string;
}