import { Controller, Post, Get, Param, Query, UseGuards, Req, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { LessonType } from '../../models/user_progress.model';

@Controller('progress')
@UseGuards(JwtGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  private validateType(type: string) {
    if (!Object.values(LessonType).includes(type as LessonType)) {
      throw new BadRequestException('lessonType must be "vocabulary" or "grammar".');
    }
    return type;
  }

  // POST /progress/lesson/5/complete?type=vocabulary
  @Post('lesson/:lessonId/complete')
  async completeLesson(
    @Req() req: any,
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @Query('type') type: string,
  ) {
    return await this.progressService.completeLesson(req.user.id, lessonId, this.validateType(type));
  }

  // GET /progress/level/2?type=vocabulary
  @Get('level/:levelId')
  async getLevelProgress(
    @Req() req: any,
    @Param('levelId', ParseIntPipe) levelId: number,
    @Query('type') type: string,
  ) {
    return await this.progressService.getLevelProgress(req.user.id, levelId, this.validateType(type));
  }

  // GET /progress/level/2/lessons?type=grammar
  @Get('level/:levelId/lessons')
  async getLessons(
    @Req() req: any,
    @Param('levelId', ParseIntPipe) levelId: number,
    @Query('type') type: string,
  ) {
    return await this.progressService.getLessonsWithStatus(req.user.id, levelId, this.validateType(type));
  }
}