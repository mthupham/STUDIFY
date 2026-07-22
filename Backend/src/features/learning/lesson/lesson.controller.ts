import { Controller, Get, Param, Query } from '@nestjs/common';
import { LessonService } from './lesson.service';

@Controller('learning/lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  // GET /learning/lessons?level=A1
  @Get()
  async getLessonsByLevel(@Query('level') level: string) {
    if (!level) {
      return { success: false, message: 'Vui lòng truyền param level (VD: ?level=A1)' };
    }
    const lessons = await this.lessonService.getLessonsByLevel(level);
    return {
      success: true,
      total: lessons.length,
      data: lessons,
    };
  }

  // GET /learning/lessons/A1_T1
  @Get(':id')
  async getLessonDetail(@Param('id') id: string) {
    return await this.lessonService.getLessonDetail(id);
  }
}