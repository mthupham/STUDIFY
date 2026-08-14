import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { StudyGroup } from '../../models/study_group.model';
import { GroupMember } from '../../models/group_member.model';
import { GroupTask } from '../../models/group_task.model';

import { GroupController } from './controller/group.controller';
import { TaskController } from './controller/task.controller';

import { GroupRepository } from './group.repository';
import { TaskRepository } from './task.repository';

import { GroupService } from './services/group.service';
import { TaskService } from './services/task.service';
import { User } from '../../models/user.model';
import { UserTaskController } from './controller/user-task.controller';

import { GroupSchedule } from '../../models/group_schedule.model';

import { ScheduleController } from './controller/schedule.controller';

import { ScheduleRepository } from './schedule.repository';

import { ScheduleService } from './services/schedule.service';
@Module({
  imports: [
    SequelizeModule.forFeature([
      StudyGroup,
      GroupMember,
      GroupTask,
      User,
      GroupSchedule,
    ]),
  ],

  controllers: [
    GroupController,
    TaskController,
      UserTaskController,
      ScheduleController,
  ],

  providers: [
    GroupRepository,
    GroupService,
    TaskRepository,
    TaskService,
    ScheduleRepository,
ScheduleService,
  ],

  exports: [
    GroupService,
  ],
})
export class VirtualStudyRoomModule {}