import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoadmapController } from './roadmap.controller';
import { RoadmapService } from './roadmap.service';
import { PlacementTestResult } from '../../../models/placement_test_result.model';
import { UserProgress } from '../../../models/user_progress.model';

@Module({
  imports: [SequelizeModule.forFeature([PlacementTestResult, UserProgress])],
  controllers: [RoadmapController],
  providers: [RoadmapService],
  exports: [RoadmapService],
})
export class RoadmapModule {}