import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { GroupTask } from '../../models/group_task.model';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(GroupTask)
    private readonly groupTaskModel: typeof GroupTask,
  ) {}

  async createTask(data: Partial<GroupTask>) {
    return this.groupTaskModel.create(data as any);
  }

  async findTaskById(taskId: number) {
    return this.groupTaskModel.findByPk(taskId);
  }

  async findTasksByGroup(groupId: number) {
    return this.groupTaskModel.findAll({
      where: { groupId },
      order: [['dueAt', 'ASC']],
    });
  }

  async findTasksAssignedToUser(
    groupId: number,
    userId: number,
  ) {
    return this.groupTaskModel.findAll({
      where: {
        groupId,
        assignedTo: userId,
        isHidden: false,
      },
      order: [['dueAt', 'ASC']],
    });
  }

  async updateTask(
    task: GroupTask,
    data: Partial<GroupTask>,
  ) {
    return task.update(data as any);
  }

  async deleteTask(task: GroupTask) {
    return task.destroy();
  }
  async findAllTasksAssignedToUser(userId: number) {
  return this.groupTaskModel.findAll({
    where: {
      assignedTo: userId,
      isHidden: false,
    },
    order: [['dueAt', 'ASC']],
  });
}

}