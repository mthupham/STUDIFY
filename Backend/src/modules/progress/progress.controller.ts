import { Controller, Post, Get, Param, Query, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { LessonType } from '../../models/user_progress.model';

@Controller('progress')
@UseGuards(JwtGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) { }

  // Normalize về lowercase rồi validate, để tương thích khi FE gửi "GRAMMAR" hoặc "grammar"
  private validateType(type: string): string {
    const normalized = (type || '').toLowerCase();
    if (!Object.values(LessonType).includes(normalized as LessonType)) {
      throw new BadRequestException('lessonType must be "vocabulary" or "grammar".');
    }
    return normalized;
  }

  // POST /progress/lesson/A1_G1/complete?type=grammar
  @Post('lesson/:lessonId/complete')
  async completeLesson(
    @Req() req: any,
    @Param('lessonId') lessonId: string,
    @Query('type') type: string,
  ) {
    return await this.progressService.completeLesson(req.user.id, lessonId, this.validateType(type));
  }

  // GET /progress/level/A1
  @Get('level/:levelId')
  async getLevelProgress(
    @Req() req: any,
    @Param('levelId') levelId: string,
  ) {
    return await this.progressService.getLevelProgress(req.user.id, levelId);
  }

  // GET /progress/level/A1/lessons
  @Get('level/:levelId/lessons')
  async getLessons(
    @Req() req: any,
    @Param('levelId') levelId: string,
  ) {
    return await this.progressService.getLessonsWithStatus(req.user.id, levelId);
  }
}