import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GroupMemberRole } from '../../../models/group_member.model';
import { GroupRepository } from '../group.repository';
import { CreateGroupDto } from '../dto/create-group.dto';
import { JoinGroupDto } from '../dto/join-group.dto';
import { generateGroupCode } from '../utilities/group-code.util';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
  ) {}
  async requireMembership(
    groupId: number,
    userId: number,
  ) {
    const membership = await this.groupRepository.findMember(
      groupId,
      userId,
    );

    if (!membership) {
      throw new ForbiddenException(
        'You are not a member of this study group.',
      );
    }

    return membership;
  }

  async requireLeader(
    groupId: number,
    userId: number,
  ) {
    const membership = await this.requireMembership(
      groupId,
      userId,
    );

    if (membership.role !== GroupMemberRole.LEADER) {
      throw new ForbiddenException(
        'Only the group leader can perform this action.',
      );
    }

    return membership;
  }

  async getMyGroups(currentUserId: number) {
    const memberships =
      await this.groupRepository.findMembershipsByUser(
        currentUserId,
      );

    const groups = await this.groupRepository.findGroupsByIds(
      memberships.map((membership) => membership.groupId),
    );

    const groupMap = new Map(
      groups.map((group) => [group.id, group]),
    );

    const items = await Promise.all(
      memberships.map(async (membership) => {
        const group = groupMap.get(membership.groupId);

        if (!group) {
          return null;
        }

        return {
          id: group.id,
          name: group.name,
          code: group.code,
          createdBy: group.createdBy,
          role: membership.role,
          joinedAt: membership.joinedAt,
          membersCount:
            await this.groupRepository.countMembers(group.id),
        };
      }),
    );

    return {
      items: items.filter((item) => item !== null),
    };
  }

  async getGroupDetail(
    groupId: number,
    currentUserId: number,
  ) {
    const group =
      await this.groupRepository.findGroupById(groupId);

    if (!group) {
      throw new NotFoundException(
        'Study group not found.',
      );
    }

    const membership = await this.requireMembership(
      groupId,
      currentUserId,
    );

    return {
      group: {
        id: group.id,
        name: group.name,
        code: group.code,
        createdBy: group.createdBy,
        membersCount:
          await this.groupRepository.countMembers(groupId),
      },
      membership: {
        userId: membership.userId,
        role: membership.role,
        joinedAt: membership.joinedAt,
      },
    };
  }

  async getMembers(
    groupId: number,
    currentUserId: number,
  ) {
    const group =
      await this.groupRepository.findGroupById(groupId);

    if (!group) {
      throw new NotFoundException(
        'Study group not found.',
      );
    }

    await this.requireMembership(
      groupId,
      currentUserId,
    );

    const members = await this.groupRepository.findMembersByGroup(
      groupId,
    );

    return {
      items: members,
    };
  }

  async createGroup(
    dto: CreateGroupDto,
    userId: number,
  ) {
    let code: string;

    do {
      code = generateGroupCode();
    } while (
      await this.groupRepository.findGroupByCode(code)
    );

    const group = await this.groupRepository.createGroup(
      dto.name,
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

  async joinGroup(
    dto: JoinGroupDto,
    userId: number,
  ) {
    const code = dto.code.trim().toUpperCase();

    const group =
      await this.groupRepository.findGroupByCode(code);

    if (!group) {
      throw new NotFoundException(
        'Study group not found.',
      );
    }

    const existingMember =
      await this.groupRepository.findMember(
        group.id,
        userId,
      );

    if (existingMember) {
      throw new ConflictException(
        'You are already a member of this study group.',
      );
    }

    const member =
      await this.groupRepository.createMember(
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
}
