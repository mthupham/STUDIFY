import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { StudyGroup } from '../../models/study_group.model';
import { GroupMember } from '../../models/group_member.model';
import { User } from '../../models/user.model';

interface CreateGroupAttributes {
  name: string;
  description: string | null;
  icon: string;
  code: string;
  createdBy: number;
}

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
    description: string | null,
    icon: string,
    code: string,
    createdBy: number,
  ): Promise<StudyGroup> {
    const data: CreateGroupAttributes = {
      name,
      description,
      icon,
      code,
      createdBy,
    };

    return this.studyGroupModel.create(data as any);
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

  async findGroupsByUserId(userId: number): Promise<StudyGroup[]> {
    const memberships = await this.groupMemberModel.findAll({
      where: {
        userId,
      },
    });

    const groupIds = memberships.map(
      (member) => member.groupId,
    );

    if (groupIds.length === 0) {
      return [];
    }

    return this.studyGroupModel.findAll({
      where: {
        id: {
          [Op.in]: groupIds,
        },
      },
      order: [['createdAt', 'DESC']],
    });
  }

  async deleteGroup(groupId: number): Promise<void> {
    await this.studyGroupModel.destroy({
      where: {
        id: groupId,
      },
    });
  }

  async findGroupWithMembers(groupId: number): Promise<StudyGroup | null> {
    return this.studyGroupModel.findByPk(groupId, {
      include: [
        {
          model: GroupMember,
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'email', 'avatar'],
            },
          ],
        },
      ],
    });
  }

  async getUserRole(groupId: number, userId: number): Promise<string | null> {
    const member = await this.findMember(groupId, userId);
    return member ? member.role : null;
  }

  async countMembers(groupId: number): Promise<number> {
    return this.groupMemberModel.count({
      where: { groupId },
    });
  }

  async updateMemberRole(groupId: number, userId: number, role: string): Promise<[number]> {
    return this.groupMemberModel.update(
      { role },
      { where: { groupId, userId } },
    );
  }

  async deleteMember(groupId: number, userId: number): Promise<number> {
    return this.groupMemberModel.destroy({
      where: { groupId, userId },
    });
  }

  async updateGroup(
    groupId: number,
    updateData: Partial<{ name: string; description: string | null; icon: string }>,
  ): Promise<StudyGroup> {
    await this.studyGroupModel.update(updateData, {
      where: { id: groupId },
    });
    return this.studyGroupModel.findByPk(groupId) as Promise<StudyGroup>;
  }
}