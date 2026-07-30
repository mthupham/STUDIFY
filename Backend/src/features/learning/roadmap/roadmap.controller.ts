import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { JwtGuard } from '../../../modules/auth/guards/jwt.guard';

@Controller('roadmap')
@UseGuards(JwtGuard)
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Get()
  async getRoadmap(@Req() req: any) {
    return await this.roadmapService.getRoadmapForUser(req.user.id);
  }
}