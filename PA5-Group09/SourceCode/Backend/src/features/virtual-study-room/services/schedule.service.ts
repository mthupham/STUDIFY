import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { UpdateScheduleDto } from '../dto/update-schedule.dto';

import { GroupRepository } from '../group.repository';
import { ScheduleRepository } from '../schedule.repository';
import { GroupService } from './group.service';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly groupRepository: GroupRepository,
    private readonly groupService: GroupService,
  ) {}

  async createSchedule(
    groupId: number,
    dto: CreateScheduleDto,
    currentUserId: number,
  ) {
    const group =
      await this.groupRepository.findGroupById(groupId);

    if (!group) {
      throw new NotFoundException(
        'Study group not found.',
      );
    }

    await this.groupService.requireLeader(
      groupId,
      currentUserId,
    );

    const startAt = new Date(dto.startAt);
    const endAt = new Date(dto.endAt);

    if (endAt <= startAt) {
      throw new BadRequestException(
        'End date must be after start date.',
      );
    }

    return this.scheduleRepository.createSchedule({
      groupId,
      title: dto.title.trim(),
      description: dto.description?.trim() || null,
      startAt,
      endAt,
      locationOrLink:
        dto.locationOrLink?.trim() || null,
      createdBy: currentUserId,
    });
  }

  async getSchedules(
    groupId: number,
    currentUserId: number,
  ) {
    await this.groupService.requireMembership(
      groupId,
      currentUserId,
    );

    return this.scheduleRepository.findSchedulesByGroup(
      groupId,
    );
  }

  async getUpcomingSchedules(
    groupId: number,
    currentUserId: number,
  ) {
    await this.groupService.requireMembership(
      groupId,
      currentUserId,
    );

    return this.scheduleRepository.findUpcomingSchedules(
      groupId,
    );
  }

  async updateSchedule(
    groupId: number,
    scheduleId: number,
    dto: UpdateScheduleDto,
    currentUserId: number,
  ) {
    await this.groupService.requireLeader(
      groupId,
      currentUserId,
    );

    const schedule =
      await this.scheduleRepository.findScheduleById(
        scheduleId,
      );

    if (!schedule) {
      throw new NotFoundException(
        'Schedule not found.',
      );
    }

    if (schedule.groupId !== groupId) {
      throw new ForbiddenException(
        'Schedule does not belong to this study group.',
      );
    }

    const startAt =
      dto.startAt !== undefined
        ? new Date(dto.startAt)
        : schedule.startAt;

    const endAt =
      dto.endAt !== undefined
        ? new Date(dto.endAt)
        : schedule.endAt;

    if (endAt <= startAt) {
      throw new BadRequestException(
        'End date must be after start date.',
      );
    }

    return this.scheduleRepository.updateSchedule(
      schedule,
      {
        ...(dto.title !== undefined && {
          title: dto.title.trim(),
        }),
        ...(dto.description !== undefined && {
          description:
            dto.description.trim() || null,
        }),
        ...(dto.startAt !== undefined && {
          startAt,
        }),
        ...(dto.endAt !== undefined && {
          endAt,
        }),
        ...(dto.locationOrLink !== undefined && {
          locationOrLink:
            dto.locationOrLink.trim() || null,
        }),
      },
    );
  }

  async deleteSchedule(
    groupId: number,
    scheduleId: number,
    currentUserId: number,
  ) {
    await this.groupService.requireLeader(
      groupId,
      currentUserId,
    );

    const schedule =
      await this.scheduleRepository.findScheduleById(
        scheduleId,
      );

    if (!schedule) {
      throw new NotFoundException(
        'Schedule not found.',
      );
    }

    if (schedule.groupId !== groupId) {
      throw new ForbiddenException(
        'Schedule does not belong to this study group.',
      );
    }

    await this.scheduleRepository.deleteSchedule(
      schedule,
    );

    return {
      success: true,
      message: 'Schedule deleted successfully.',
    };
  }
}