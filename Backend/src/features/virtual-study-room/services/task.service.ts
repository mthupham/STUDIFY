import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  GroupTask,
  GroupTaskStatus,
} from '../../../models/group_task.model';

import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { UpdateTaskStatusDto } from '../dto/update-task-status.dto';

import { GroupRepository } from '../group.repository';
import { TaskRepository } from '../task.repository';
import { GroupService } from './group.service';
import { UpdateTaskVisibilityDto } from '../dto/update-task-visibility.dto';
@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly groupRepository: GroupRepository,
    private readonly groupService: GroupService,
  ) {}

  async createTask(
    groupId: number,
    dto: CreateTaskDto,
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

    const assignedMember =
      await this.groupRepository.findMember(
        groupId,
        dto.assignedTo,
      );

    if (!assignedMember) {
      throw new BadRequestException(
        'Assigned user is not a member of this group.',
      );
    }

    const startAt = dto.startAt
      ? new Date(dto.startAt)
      : null;

    const dueAt = new Date(dto.dueAt);

    if (startAt && dueAt <= startAt) {
      throw new BadRequestException(
        'Due date must be after start date.',
      );
    }

    return this.taskRepository.createTask({
      groupId,
      createdBy: currentUserId,
      assignedTo: dto.assignedTo,
      title: dto.title.trim(),
      description: dto.description?.trim() || null,
      category: dto.category,
      startAt,
      dueAt,
      status: GroupTaskStatus.NOT_STARTED,
      completedAt: null,
      isHidden: false,
    });
  }

  async getGroupTasks(
    groupId: number,
    currentUserId: number,
  ) {
    await this.groupService.requireMembership(
      groupId,
      currentUserId,
    );

    return this.taskRepository.findTasksByGroup(
      groupId,
    );
  }

  async getMyTasks(
    groupId: number,
    currentUserId: number,
  ) {
    await this.groupService.requireMembership(
      groupId,
      currentUserId,
    );

    return this.taskRepository.findTasksAssignedToUser(
      groupId,
      currentUserId,
    );
  }

  async updateTask(
    groupId: number,
    taskId: number,
    dto: UpdateTaskDto,
    currentUserId: number,
  ) {
    await this.groupService.requireLeader(
      groupId,
      currentUserId,
    );

    const task =
      await this.taskRepository.findTaskById(taskId);

    if (!task) {
      throw new NotFoundException(
        'Task not found.',
      );
    }

    if (task.groupId !== groupId) {
      throw new ForbiddenException(
        'Task does not belong to this study group.',
      );
    }

    if (dto.assignedTo !== undefined) {
      const assignedMember =
        await this.groupRepository.findMember(
          groupId,
          dto.assignedTo,
        );

      if (!assignedMember) {
        throw new BadRequestException(
          'Assigned user is not a member of this group.',
        );
      }
    }

    const startAt =
      dto.startAt !== undefined
        ? new Date(dto.startAt)
        : task.startAt;

    const dueAt =
      dto.dueAt !== undefined
        ? new Date(dto.dueAt)
        : task.dueAt;

    if (startAt && dueAt <= startAt) {
      throw new BadRequestException(
        'Due date must be after start date.',
      );
    }

    return this.taskRepository.updateTask(
      task,
      {
        ...(dto.title !== undefined && {
          title: dto.title.trim(),
        }),
        ...(dto.description !== undefined && {
          description:
            dto.description.trim() || null,
        }),
        ...(dto.category !== undefined && {
          category: dto.category,
        }),
        ...(dto.assignedTo !== undefined && {
          assignedTo: dto.assignedTo,
        }),
        ...(dto.startAt !== undefined && {
          startAt,
        }),
        ...(dto.dueAt !== undefined && {
          dueAt,
        }),
      },
    );
  }

  async updateMyTaskStatus(
    groupId: number,
    taskId: number,
    dto: UpdateTaskStatusDto,
    currentUserId: number,
  ) {
    await this.groupService.requireMembership(
      groupId,
      currentUserId,
    );

    const task =
      await this.taskRepository.findTaskById(taskId);

    if (!task) {
      throw new NotFoundException(
        'Task not found.',
      );
    }

    if (task.groupId !== groupId) {
      throw new ForbiddenException(
        'Task does not belong to this study group.',
      );
    }

    if (task.assignedTo !== currentUserId) {
      throw new ForbiddenException(
        'You can only update your own assigned task.',
      );
    }

    const completedAt =
      dto.status === GroupTaskStatus.COMPLETED
        ? new Date()
        : null;

    return this.taskRepository.updateTask(
      task,
      {
        status: dto.status,
        completedAt,
      },
    );
  }

  async deleteTask(
    groupId: number,
    taskId: number,
    currentUserId: number,
  ) {
    await this.groupService.requireLeader(
      groupId,
      currentUserId,
    );

    const task =
      await this.taskRepository.findTaskById(taskId);

    if (!task) {
      throw new NotFoundException(
        'Task not found.',
      );
    }

    if (task.groupId !== groupId) {
      throw new ForbiddenException(
        'Task does not belong to this study group.',
      );
    }

    await this.taskRepository.deleteTask(task);

    return {
      success: true,
      message: 'Task deleted successfully.',
    };
  }
  async updateTaskVisibility(
  groupId: number,
  taskId: number,
  dto: UpdateTaskVisibilityDto,
  currentUserId: number,
) {
  await this.groupService.requireLeader(
    groupId,
    currentUserId,
  );

  const task =
    await this.taskRepository.findTaskById(taskId);

  if (!task) {
    throw new NotFoundException(
      'Task not found.',
    );
  }

  if (task.groupId !== groupId) {
    throw new ForbiddenException(
      'Task does not belong to this study group.',
    );
  }

  return this.taskRepository.updateTask(
    task,
    {
      isHidden: dto.isHidden,
    },
  );
}
async getAllMyTasks(
  currentUserId: number,
) {
  return this.taskRepository.findAllTasksAssignedToUser(
    currentUserId,
  );
}
}