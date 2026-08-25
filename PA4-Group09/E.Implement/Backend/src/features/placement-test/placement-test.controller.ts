import { Body, Controller, Post, Get, Query, BadRequestException } from '@nestjs/common';
import { PlacementTestService } from './placement-test.service';
import { SubmitTestDto } from './submit-test.dto';

@Controller('placement-test')
export class PlacementTestController {
  constructor(private readonly placementTestService: PlacementTestService) {}

  @Post('submit') // POST: /placement-test/submit
  submit(@Body() dto: SubmitTestDto) {
    return this.placementTestService.submitTest(dto);
  }

  @Get('my-roadmap') // GET: /placement-test/my-roadmap?userId=xxx
  getMyRoadmap(@Query('userId') userId: string) {
    if (!userId) {
      throw new BadRequestException('Vui lòng cung cấp tham số userId để lấy lộ trình học.');
    }
    return this.placementTestService.getMyRoadmap(userId);
  }
  @Get('lesson-detail') // Đường dẫn đầy đủ: GET /placement-test/lesson-detail?lessonId=...
  getLessonDetail(
    @Query('lessonId') lessonId: string,
    @Query('type') type: string, // 'VOCABULARY' hoặc 'GRAMMAR'
  ) {
    return this.placementTestService.getLessonDetail(lessonId, type);
  }
}
