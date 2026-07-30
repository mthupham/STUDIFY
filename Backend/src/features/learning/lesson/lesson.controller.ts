import { Controller, Get, Param, Query, Post, Req, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { JwtGuard } from '../../../modules/auth/guards/jwt.guard';

@Controller('learning/lessons')
@UseGuards(JwtGuard)
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  // GET /learning/lessons?level=A1
  @Get()
  async getLessonsByLevel(@Query('level') level: string, @Req() req: any) {
    if (!level) {
      return { success: false, message: 'Vui lòng truyền param level (VD: ?level=A1)' };
    }
    const lessons = await this.lessonService.getLessonsByLevel(level, req.user.id);
    return {
      success: true,
      total: lessons.length,
      data: lessons,
    };
  }

  // GET /learning/lessons/A1_T1
  @Get(':id')
  async getLessonDetail(@Param('id') id: string, @Req() req: any) {
    return await this.lessonService.getLessonDetail(id, req.user.id);
  }

  // POST /learning/lessons/A1_T1/complete
  @Post(':id/complete')
  async markComplete(
    @Param('id') id: string,
    @Query('type') type: 'VOCABULARY' | 'GRAMMAR',
    @Req() req: any,
  ) {
    return await this.lessonService.markLessonComplete(id, type, req.user.id);
  }
}