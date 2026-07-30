import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoadmapController } from './roadmap.controller';
import { RoadmapService } from './roadmap.service';
import { UserProgress } from '../../../models/user_progress.model';
import { PlacementTestResult } from '../../../models/placement_test_result.model'; // thêm import
import { UserModule } from '../../../modules/user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserProgress, PlacementTestResult]), // thêm PlacementTestResult vào đây
    UserModule,
  ],
  controllers: [RoadmapController],
  providers: [RoadmapService],
  exports: [RoadmapService],
})
export class RoadmapModule {}