import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StudyGroup } from '../../models/study_group.model';
import { GroupMember } from '../../models/group_member.model';

@Injectable()
export class GroupRepository {
  constructor(
    @InjectModel(StudyGroup)
    private readonly studyGroupModel: typeof StudyGroup,

    @InjectModel(GroupMember)
    private readonly groupMemberModel: typeof GroupMember,
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
}