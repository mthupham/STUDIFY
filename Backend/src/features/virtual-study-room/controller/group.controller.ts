import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Get,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../../../modules/auth/guards/jwt.guard';

import { GroupService } from '../services/group.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { JoinGroupDto } from '../dto/join-group.dto';

@ApiTags('Study Groups')
@ApiBearerAuth()
@Controller('groups')
@UseGuards(JwtGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new study group',
  })
  async createGroup(@Body() dto: CreateGroupDto, @Req() req: any) {
    return this.groupService.createGroup(dto, req.user.id);
  }

  @Post('join')
  @ApiOperation({
    summary: 'Join a study group using group code',
  })
  async joinGroup(@Body() dto: JoinGroupDto, @Req() req: any) {
    return this.groupService.joinGroup(dto, req.user.id);
  }

  @Get('my-groups')
  @ApiOperation({
    summary: 'Get all study groups of the authenticated user',
  })
  async getMyGroups(@Req() req: any) {
    return this.groupService.getUserGroups(req.user.id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a study group',
  })
  async deleteGroup(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.groupService.deleteGroup(id, req.user.id);
  }
}
