import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { GroupTaskCategory } from '../../../models/group_task.model';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(GroupTaskCategory)
  category: GroupTaskCategory;

  @IsInt()
  assignedTo: number;

  @IsOptional()
  @IsDateString()
  startAt?: string;

  @IsDateString()
  dueAt: string;
}