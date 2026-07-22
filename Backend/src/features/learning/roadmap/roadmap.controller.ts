import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';

@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Get()
  async getRoadmap() {
    // Giả lập userId, thực tế lấy từ @Req() req sau khi qua AuthGuard
    const mockUserId = 'user-123';
    return await this.roadmapService.getRoadmapForUser(mockUserId);
  }
}