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

import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtGuard } from '../../../modules/auth/guards/jwt.guard';

import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { UpdateScheduleDto } from '../dto/update-schedule.dto';
import { ScheduleService } from '../services/schedule.service';

@ApiTags('Study Group Schedules')
@Controller('groups/:groupId/schedules')
@UseGuards(JwtGuard)
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all schedules of a study group',
  })
  async getSchedules(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Req() req: any,
  ) {
    return this.scheduleService.getSchedules(
      groupId,
      req.user.id,
    );
  }

  @Get('upcoming')
  @ApiOperation({
    summary: 'Get upcoming schedules of a study group',
  })
  async getUpcomingSchedules(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Req() req: any,
  ) {
    return this.scheduleService.getUpcomingSchedules(
      groupId,
      req.user.id,
    );
  }

  @Post()
  @ApiOperation({
    summary: 'Create a schedule for a study group',
  })
  async createSchedule(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() dto: CreateScheduleDto,
    @Req() req: any,
  ) {
    return this.scheduleService.createSchedule(
      groupId,
      dto,
      req.user.id,
    );
  }

  @Patch(':scheduleId')
  @ApiOperation({
    summary: 'Update a study group schedule',
  })
  async updateSchedule(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('scheduleId', ParseIntPipe) scheduleId: number,
    @Body() dto: UpdateScheduleDto,
    @Req() req: any,
  ) {
    return this.scheduleService.updateSchedule(
      groupId,
      scheduleId,
      dto,
      req.user.id,
    );
  }

  @Delete(':scheduleId')
  @ApiOperation({
    summary: 'Delete a study group schedule',
  })
  async deleteSchedule(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('scheduleId', ParseIntPipe) scheduleId: number,
    @Req() req: any,
  ) {
    return this.scheduleService.deleteSchedule(
      groupId,
      scheduleId,
      req.user.id,
    );
  }
}