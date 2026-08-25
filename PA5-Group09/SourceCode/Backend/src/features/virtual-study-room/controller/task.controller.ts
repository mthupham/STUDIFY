import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../../../modules/auth/guards/jwt.guard';

import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { UpdateTaskStatusDto } from '../dto/update-task-status.dto';

import { TaskService } from '../services/task.service';
import { UpdateTaskVisibilityDto } from '../dto/update-task-visibility.dto';
@ApiTags('Study Group Tasks')
@Controller('groups/:groupId/tasks')
@UseGuards(JwtGuard)
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all tasks in a study group',
  })
  async getGroupTasks(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Req() req: any,
  ) {
    return this.taskService.getGroupTasks(
      groupId,
      req.user.id,
    );
  }

  @Get('me')
  @ApiOperation({
    summary: 'Get tasks assigned to current user',
  })
  async getMyTasks(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Req() req: any,
  ) {
    return this.taskService.getMyTasks(
      groupId,
      req.user.id,
    );
  }

  @Post()
  @ApiOperation({
    summary: 'Create a task for a study group',
  })
  async createTask(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() dto: CreateTaskDto,
    @Req() req: any,
  ) {
    return this.taskService.createTask(
      groupId,
      dto,
      req.user.id,
    );
  }

  @Patch(':taskId')
  @ApiOperation({
    summary: 'Update a study group task',
  })
  async updateTask(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto,
    @Req() req: any,
  ) {
    return this.taskService.updateTask(
      groupId,
      taskId,
      dto,
      req.user.id,
    );
  }

  @Patch(':taskId/status')
  @ApiOperation({
    summary: 'Update status of current user assigned task',
  })
  async updateMyTaskStatus(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskStatusDto,
    @Req() req: any,
  ) {
    return this.taskService.updateMyTaskStatus(
      groupId,
      taskId,
      dto,
      req.user.id,
    );
  }

  @Delete(':taskId')
  @ApiOperation({
    summary: 'Delete a study group task',
  })
  async deleteTask(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Req() req: any,
  ) {
    return this.taskService.deleteTask(
      groupId,
      taskId,
      req.user.id,
    );
  }
  @Patch(':taskId/visibility')
@ApiOperation({
  summary: 'Hide or show a study group task',
})
async updateTaskVisibility(
  @Param('groupId', ParseIntPipe) groupId: number,
  @Param('taskId', ParseIntPipe) taskId: number,
  @Body() dto: UpdateTaskVisibilityDto,
  @Req() req: any,
) {
  return this.taskService.updateTaskVisibility(
    groupId,
    taskId,
    dto,
    req.user.id,
  );
}
}