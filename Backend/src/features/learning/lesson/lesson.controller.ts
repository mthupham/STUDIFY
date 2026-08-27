import { Controller, Get, Param, Query, Post, Req, UseGuards, Body} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { JwtGuard } from '../../../modules/auth/guards/jwt.guard';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SubmitPracticeDto } from './dto/submit-practice.dto';

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
  

  // GET /learning/lessons/A1_T1/questions
  // @Get(':id/questions')
  // async getLessonQuestions(@Param('id') id: string) {
  //   return await this.lessonService.getLessonQuestions(id);
  // }
  @Get(':id/questions')
async getLessonQuestions(
  @Param('id') id: string,
  @Query('skill') skill: 'reading' | 'writing' = 'reading',
) {
  return await this.lessonService.getLessonQuestions(id, skill);
}
  // GET /learning/lessons/A1_T1
  @Get(':id')
  async getLessonDetail(@Param('id') id: string, @Req() req: any) {
    return await this.lessonService.getLessonDetail(id, req.user.id);
  }



@Post(':id/submit-answer')
async submitAnswer(
  @Param('id') id: string,
  @Body() dto: SubmitAnswerDto,
  @Req() req: any,
) {
  return this.lessonService.submitMultipleChoiceAnswer(
    id,
    dto.questionId,
    dto.userAnswer,
    req.user.id,
  );
}
// POST /learning/lessons/A1_T1/submit-practice
@Post(':id/submit-practice')
async submitPractice(
  @Param('id') lessonId: string,
  @Body() dto: SubmitPracticeDto,
  @Req() req: any,
) {
  return this.lessonService.submitPractice(
    lessonId,
    dto.skill,
    dto.answers,
    req.user.id,
  );
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
