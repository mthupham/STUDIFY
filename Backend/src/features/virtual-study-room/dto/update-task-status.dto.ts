import { IsEnum } from 'class-validator';
import { GroupTaskStatus } from '../../../models/group_task.model';

export class UpdateTaskStatusDto {
  @IsEnum(GroupTaskStatus)
  status: GroupTaskStatus;
}