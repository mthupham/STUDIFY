import { Body, Controller, Post, Get, Query, UseGuards, Req } from '@nestjs/common';
import { PlacementTestService } from './placement-test.service';
import { SubmitTestDto } from './submit-test.dto';
import { JwtGuard } from '../../modules/auth/guards/jwt.guard';

@Controller('placement-test')
export class PlacementTestController {
  constructor(private readonly placementTestService: PlacementTestService) {}

  @Get('questions')
  getQuestions() {
    return this.placementTestService.getQuestions();
  }

  @UseGuards(JwtGuard)
  @Post('submit')
  submit(@Body() dto: SubmitTestDto, @Req() req) {
    return this.placementTestService.submitTest(dto, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Get('my-roadmap')
  getMyRoadmap(@Req() req) {
    return this.placementTestService.getMyRoadmap(req.user.id);
  }

  @Get('lesson-detail')
  getLessonDetail(
    @Query('lessonId') lessonId: string,
    @Query('type') type: string,
  ) {
    return this.placementTestService.getLessonDetail(lessonId, type);
  }
}