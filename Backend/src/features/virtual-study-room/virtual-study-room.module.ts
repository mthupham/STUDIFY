import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { StudyGroup } from '../../models/study_group.model';
import { GroupMember } from '../../models/group_member.model';

import { GroupController } from './controller/group.controller';
import { GroupRepository } from './group.repository';
import { GroupService } from './services/group.service';
import { User } from '../../models/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      StudyGroup,
      GroupMember,
      User,
    ]),
  ],

  controllers: [
    GroupController,
  ],

  providers: [
    GroupRepository,
    GroupService,
  ],

  exports: [
    GroupService,
  ],
})
export class VirtualStudyRoomModule {}