import { IsNotEmpty, IsObject } from 'class-validator';

export class SubmitPlacementTestDto {
  @IsNotEmpty()
  @IsObject()
  declare answers: Record<number, string>;
}