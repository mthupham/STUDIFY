import { IsEnum } from 'class-validator';
import { GroupMemberRole } from '../../../models/group_member.model';

export class ChangeRoleDto {
  @IsEnum(GroupMemberRole)
  role!: GroupMemberRole;
}
