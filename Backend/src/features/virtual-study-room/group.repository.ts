import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { StudyGroup } from '../../models/study_group.model';
import { GroupMember } from '../../models/group_member.model';
import { User } from '../../models/user.model';

@Injectable()
export class GroupRepository {
  constructor(
    @InjectModel(StudyGroup)
    private readonly studyGroupModel: typeof StudyGroup,

    @InjectModel(GroupMember)
    private readonly groupMemberModel: typeof GroupMember,

    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findGroupByCode(code: string): Promise<StudyGroup | null> {
    return this.studyGroupModel.findOne({
      where: { code },
    });
  }

  async findGroupById(id: number): Promise<StudyGroup | null> {
    return this.studyGroupModel.findByPk(id);
  }

  async createGroup(
    name: string,
    code: string,
    createdBy: number,
  ): Promise<StudyGroup> {
    return this.studyGroupModel.create({
      name,
      code,
      createdBy,
    });
  }

  async createMember(
    groupId: number,
    userId: number,
    role: string,
  ): Promise<GroupMember> {
    return this.groupMemberModel.create({
      groupId,
      userId,
      role,
      joinedAt: new Date(),
    });
  }

  async findMember(
    groupId: number,
    userId: number,
  ): Promise<GroupMember | null> {
    return this.groupMemberModel.findOne({
      where: {
        groupId,
        userId,
      },
    });
  }

  async findMembershipsByUser(userId: number) {
    return this.groupMemberModel.findAll({
      where: { userId },
      order: [['joinedAt', 'DESC']],
    });
  }

  async findGroupsByIds(groupIds: number[]) {
    if (groupIds.length === 0) {
      return [];
    }

    return this.studyGroupModel.findAll({
      where: {
        id: {
          [Op.in]: groupIds,
        },
      },
    });
  }

  async countMembers(groupId: number) {
    return this.groupMemberModel.count({
      where: { groupId },
    });
  }

  async findMembersByGroup(groupId: number) {
    const memberships = await this.groupMemberModel.findAll({
      where: { groupId },
      order: [['joinedAt', 'ASC']],
    });

    const userIds = memberships.map((member) => member.userId);

    const users = await this.userModel.findAll({
      where: {
        id: userIds,
      },
    });

    const userMap = new Map(
      users.map((user) => [user.id, user]),
    );

    return memberships.map((member) => {
      const user = userMap.get(member.userId);

      return {
        userId: member.userId,
        name: user?.name ?? '',
        email: user?.email ?? '',
        avatar: user?.avatar ?? null,
        role: member.role,
        joinedAt: member.joinedAt,
      };
    });
  }
}
