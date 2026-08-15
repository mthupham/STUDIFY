import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';
import { GroupTaskStatus } from '../../../models/group_task.model';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsEnum(GroupTaskStatus)
  status?: GroupTaskStatus;
}
