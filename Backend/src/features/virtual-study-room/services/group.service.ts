import {
  ConflictException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { GroupRepository } from '../group.repository';
import { CreateGroupDto } from '../dto/create-group.dto';
import { JoinGroupDto } from '../dto/join-group.dto';
import { generateGroupCode } from '../utilities/group-code.util';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async createGroup(dto: CreateGroupDto, userId: number) {
    let code: string;

    do {
      code = generateGroupCode();
    } while (await this.groupRepository.findGroupByCode(code));

    const group = await this.groupRepository.createGroup(
      dto.name,
      dto.description ?? null,
      dto.icon,
      code,
      userId,
    );

    const member = await this.groupRepository.createMember(
      group.id,
      userId,
      'LEADER',
    );

    return {
      status: 'success',
      message: 'Study group created successfully.',
      data: {
        group: {
          id: group.id,
          name: group.name,
          description: group.description,
          icon: group.icon,
          code: group.code,
          createdBy: group.createdBy,
        },
        member: {
          userId: member.userId,
          role: member.role,
          joinedAt: member.joinedAt,
        },
      },
    };
  }
  async joinGroup(dto: JoinGroupDto, userId: number) {
    const code = dto.code.trim().toUpperCase();

    const group = await this.groupRepository.findGroupByCode(code);

    if (!group) {
      throw new NotFoundException('Study group not found.');
    }

    const existingMember = await this.groupRepository.findMember(
      group.id,
      userId,
    );

    if (existingMember) {
      throw new ConflictException(
        'You are already a member of this study group.',
      );
    }

    const member = await this.groupRepository.createMember(
      group.id,
      userId,
      'MEMBER',
    );

    return {
      status: 'success',
      message: 'Joined study group successfully.',
      data: {
        group: {
          id: group.id,
          name: group.name,
          code: group.code,
        },
        member: {
          userId: member.userId,
          role: member.role,
          joinedAt: member.joinedAt,
        },
      },
    };
  }

  async getUserGroups(userId: number) {
    const groups = await this.groupRepository.findGroupsByUserId(userId);
    return {
      status: 'success',
      data: groups,
    };
  }

  async deleteGroup(groupId: number, userId: number) {
    const group = await this.groupRepository.findGroupById(groupId);

    if (!group) {
      throw new NotFoundException('Group not found.');
    }

    if (group.createdBy !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this group.',
      );
    }

    await this.groupRepository.deleteGroup(groupId);

    return {
      status: 'success',
      message: 'Group deleted successfully.',
    };
  }
}
