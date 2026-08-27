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
import { UpdateGroupDto } from '../dto/update-group.dto';
import { ChangeRoleDto } from '../dto/change-role.dto';
import { generateGroupCode } from '../utilities/group-code.util';

const MAX_MEMBERS = 5;

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
      items: members.map((m) => ({
        userId: m.userId,
        name: m.user?.name ?? `User #${m.userId}`,
        email: m.user?.email ?? '',
        avatar: m.user?.avatar ?? null,
        level: m.user?.currentLevel ?? 'INTERMEDIATE',
        role: m.role,
        joinedAt: m.joinedAt,
      })),
    };
  }

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

  // ─── UC2: Join Group via Code ─────────────────────────────────────────────────

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

    // F3.2: Max capacity check — giới hạn tối đa 5 thành viên
    const memberCount = await this.groupRepository.countMembers(group.id);
    if (memberCount >= MAX_MEMBERS) {
      throw new ForbiddenException(
        `This study group has reached the maximum capacity of ${MAX_MEMBERS} members.`,
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

  // ─── List user's groups ───────────────────────────────────────────────────────

  async getUserGroups(userId: number) {
    const groups = await this.groupRepository.findGroupsByUserId(userId);
    const mappedGroups = groups.map((group) => {
      const userMembership = group.members?.find((m) => m.userId === userId);
      return {
        id: group.id,
        name: group.name,
        description: group.description,
        icon: group.icon,
        code: group.code,
        createdBy: group.createdBy,
        role: userMembership ? userMembership.role : 'MEMBER',
        joinedAt: userMembership ? userMembership.joinedAt : null,
        membersCount: group.members ? group.members.length : 0,
        members: (group.members ?? []).map((m) => ({
          userId: m.userId,
          name: m.user?.name ?? `User #${m.userId}`,
          email: m.user?.email ?? '',
          avatar: m.user?.avatar ?? null,
          level: m.user?.currentLevel ?? 'INTERMEDIATE',
          role: m.role,
          joinedAt: m.joinedAt,
        })),
      };
    });
    return {
      status: 'success',
      data: mappedGroups,
    };
  }

  // ─── F3.2: Get Group Details + currentUserRole ────────────────────────────────

  async getGroupDetails(groupId: number, userId: number) {
    const userRole = await this.groupRepository.getUserRole(groupId, userId);

    if (!userRole) {
      throw new ForbiddenException('You are not a member of this study group.');
    }

    const group = await this.groupRepository.findGroupWithMembers(groupId);

    if (!group) {
      throw new NotFoundException('Study group not found.');
    }

    return {
      status: 'success',
      data: {
        group: {
          id: group.id,
          name: group.name,
          description: group.description,
          icon: group.icon,
          code: group.code,
          createdBy: group.createdBy,
          members: (group.members ?? []).map((m: any) => ({
            userId: m.userId,
            role: m.role,
            joinedAt: m.joinedAt,
            user: m.user
              ? {
                  id: m.user.id,
                  name: m.user.name,
                  email: m.user.email,
                  avatar: m.user.avatar ?? null,
                  level: m.user.currentLevel ?? 'INTERMEDIATE',
                }
              : null,
          })),
        },
        currentUserRole: userRole,
      },
    };
  }

  // ─── F3.2: Update Group Info (Leader only) ────────────────────────────────────

  async updateGroupInfo(groupId: number, dto: UpdateGroupDto, userId: number) {
    const userRole = await this.groupRepository.getUserRole(groupId, userId);

    if (userRole !== GroupMemberRole.LEADER) {
      throw new ForbiddenException(
        'Only the group Leader can update group information.',
      );
    }

    const group = await this.groupRepository.findGroupById(groupId);
    if (!group) {
      throw new NotFoundException('Study group not found.');
    }

    const updatedGroup = await this.groupRepository.updateGroup(groupId, {
      ...(dto.name !== undefined && { name: dto.name }),
      ...(dto.description !== undefined && { description: dto.description }),
      ...(dto.icon !== undefined && { icon: dto.icon }),
    });

    return {
      status: 'success',
      message: 'Group information updated successfully.',
      data: {
        id: updatedGroup.id,
        name: updatedGroup.name,
        description: updatedGroup.description,
        icon: updatedGroup.icon,
        code: updatedGroup.code,
      },
    };
  }

  // ─── F3.2: Change Member Role (Leader only) ───────────────────────────────────

  async changeMemberRole(
    groupId: number,
    targetUserId: number,
    dto: ChangeRoleDto,
    requesterId: number,
  ) {
    const requesterRole = await this.groupRepository.getUserRole(
      groupId,
      requesterId,
    );

    if (requesterRole !== GroupMemberRole.LEADER) {
      throw new ForbiddenException(
        'Only the group Leader can change member roles.',
      );
    }

    if (targetUserId === requesterId) {
      throw new ForbiddenException(
        'You cannot change your own role. Transfer leadership to another member instead.',
      );
    }

    const targetMember = await this.groupRepository.findMember(
      groupId,
      targetUserId,
    );
    if (!targetMember) {
      throw new NotFoundException(
        'Target user is not a member of this group.',
      );
    }

    // Transfer leadership: requester → MEMBER, target → LEADER
    if (dto.role === GroupMemberRole.LEADER) {
      await this.groupRepository.updateMemberRole(
        groupId,
        requesterId,
        GroupMemberRole.MEMBER,
      );
    }
    await this.groupRepository.updateMemberRole(groupId, targetUserId, dto.role);

    return {
      status: 'success',
      message: `Member role updated to ${dto.role}.`,
      data: { userId: targetUserId, newRole: dto.role },
    };
  }

  // ─── F3.2: Remove Member (Leader only) ───────────────────────────────────────

  async removeMember(
    groupId: number,
    targetUserId: number,
    requesterId: number,
  ) {
    const requesterRole = await this.groupRepository.getUserRole(
      groupId,
      requesterId,
    );

    if (requesterRole !== GroupMemberRole.LEADER) {
      throw new ForbiddenException('Only the group Leader can remove members.');
    }

    if (targetUserId === requesterId) {
      throw new ForbiddenException(
        'The group Leader cannot remove themselves. Transfer leadership first.',
      );
    }

    const targetMember = await this.groupRepository.findMember(
      groupId,
      targetUserId,
    );
    if (!targetMember) {
      throw new NotFoundException(
        'Target user is not a member of this group.',
      );
    }

    await this.groupRepository.deleteMember(groupId, targetUserId);

    return {
      status: 'success',
      message: 'Member removed from the group.',
      data: { userId: targetUserId },
    };
  }

  // ─── Delete Group (Creator only) ─────────────────────────────────────────────

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
