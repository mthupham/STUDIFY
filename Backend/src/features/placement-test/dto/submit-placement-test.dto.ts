import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class UserAnswerDto {
  @ApiProperty({
    description: 'ID của câu hỏi trong Database',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({
    description: 'Đáp án người dùng chọn (A, B, C, D)',
    example: 'A',
  })
  @IsString()
  @IsNotEmpty()
  selectedAnswer: string;
}

export class SubmitPlacementTestDto {
  @ApiProperty({
    description: 'Danh sách các câu trả lời của người dùng',
    type: [UserAnswerDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserAnswerDto)
  answers: UserAnswerDto[];
}