import { IsNotEmpty, IsObject } from 'class-validator';

export class SubmitTestDto {
  @IsNotEmpty()
  @IsObject()
  declare answers: Record<number, string>;
}