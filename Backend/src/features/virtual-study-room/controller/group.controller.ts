import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtGuard } from '../../../modules/auth/guards/jwt.guard';

import { GroupService } from '../services/group.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { JoinGroupDto } from '../dto/join-group.dto';

@ApiTags('Study Groups')
@Controller('groups')
@UseGuards(JwtGuard)
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new study group',
  })
  async createGroup(
    @Body() dto: CreateGroupDto,
    @Req() req: any,
  ) {
    return this.groupService.createGroup(
      dto,
      req.user.id,
    );
  }

  @Post('join')
  @ApiOperation({
    summary: 'Join a study group using group code',
  })
  async joinGroup(
    @Body() dto: JoinGroupDto,
    @Req() req: any,
  ) {
    return this.groupService.joinGroup(
      dto,
      req.user.id,
    );
  }
}