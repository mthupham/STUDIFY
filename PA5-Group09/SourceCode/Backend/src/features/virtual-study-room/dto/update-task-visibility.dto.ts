import { IsBoolean } from 'class-validator';

export class UpdateTaskVisibilityDto {
  @IsBoolean()
  isHidden: boolean;
}