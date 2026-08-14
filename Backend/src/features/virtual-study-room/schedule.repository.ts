import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { GroupSchedule } from '../../models/group_schedule.model';

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectModel(GroupSchedule)
    private readonly groupScheduleModel: typeof GroupSchedule,
  ) {}

  async createSchedule(data: Partial<GroupSchedule>) {
    return this.groupScheduleModel.create(data as any);
  }

  async findScheduleById(scheduleId: number) {
    return this.groupScheduleModel.findByPk(scheduleId);
  }

  async findSchedulesByGroup(groupId: number) {
    return this.groupScheduleModel.findAll({
      where: { groupId },
      order: [['startAt', 'ASC']],
    });
  }

  async findUpcomingSchedules(groupId: number) {
    return this.groupScheduleModel.findAll({
      where: {
        groupId,
        startAt: {
          [Op.gte]: new Date(),
        },
      },
      order: [['startAt', 'ASC']],
    });
  }

  async updateSchedule(
    schedule: GroupSchedule,
    data: Partial<GroupSchedule>,
  ) {
    return schedule.update(data as any);
  }

  async deleteSchedule(schedule: GroupSchedule) {
    return schedule.destroy();
  }
}