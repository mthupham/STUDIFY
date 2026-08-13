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
  Patch,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../../../modules/auth/guards/jwt.guard';

import { GroupService } from '../services/group.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { JoinGroupDto } from '../dto/join-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { ChangeRoleDto } from '../dto/change-role.dto';

@ApiTags('Study Groups')
@ApiBearerAuth()
@Controller('groups')
@UseGuards(JwtGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // ─── UC1: Create Group ──────────────────────────────────────────────────────

  @Post()
  @ApiOperation({ summary: 'Create a new study group' })
  async createGroup(@Body() dto: CreateGroupDto, @Req() req: any) {
    return this.groupService.createGroup(dto, req.user.id);
  }

  // ─── UC2: Join Group via Code ───────────────────────────────────────────────

  @Post('join')
  @ApiOperation({ summary: 'Join a study group using group code' })
  async joinGroup(@Body() dto: JoinGroupDto, @Req() req: any) {
    return this.groupService.joinGroup(dto, req.user.id);
  }

  // ─── List my groups ─────────────────────────────────────────────────────────

  @Get('my-groups')
  @ApiOperation({ summary: 'Get all study groups of the authenticated user' })
  async getMyGroups(@Req() req: any) {
    return this.groupService.getUserGroups(req.user.id);
  }

  // ─── F3.2: Get Group Details (must be member) ───────────────────────────────

  @Get(':id')
  @ApiOperation({
    summary: 'Get study group details with members list and current user role',
  })
  async getGroupDetails(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    return this.groupService.getGroupDetails(id, req.user.id);
  }

  // ─── F3.2: Update Group Info (Leader only) ──────────────────────────────────

  @Patch(':id')
  @ApiOperation({ summary: 'Update group info (Leader only)' })
  async updateGroupInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGroupDto,
    @Req() req: any,
  ) {
    return this.groupService.updateGroupInfo(id, dto, req.user.id);
  }

  // ─── F3.2: Change Member Role (Leader only) ─────────────────────────────────

  @Patch(':id/members/:userId/role')
  @ApiOperation({ summary: 'Change a member role (Leader only)' })
  async changeMemberRole(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: ChangeRoleDto,
    @Req() req: any,
  ) {
    return this.groupService.changeMemberRole(id, userId, dto, req.user.id);
  }

  // ─── F3.2: Remove Member (Leader only) ─────────────────────────────────────

  @Delete(':id/members/:userId')
  @ApiOperation({ summary: 'Remove a member from the group (Leader only)' })
  async removeMember(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req: any,
  ) {
    return this.groupService.removeMember(id, userId, req.user.id);
  }

  // ─── Delete Group ───────────────────────────────────────────────────────────

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a study group (creator only)' })
  async deleteGroup(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.groupService.deleteGroup(id, req.user.id);
  }
}
