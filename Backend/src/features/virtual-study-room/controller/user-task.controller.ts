import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtGuard } from '../../../modules/auth/guards/jwt.guard';
import { TaskService } from '../services/task.service';

@ApiTags('My Tasks')
@Controller('tasks')
@UseGuards(JwtGuard)
export class UserTaskController {
  constructor(
    private readonly taskService: TaskService,
  ) {}

  @Get('me')
  @ApiOperation({
    summary: 'Get all tasks assigned to current user',
  })
  async getAllMyTasks(
    @Req() req: any,
  ) {
    return this.taskService.getAllMyTasks(
      req.user.id,
    );
  }
}