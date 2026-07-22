import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlacementTestQuestion } from './models/placement-test-question.model';
import { PlacementTestResult } from './models/placement-test-result.model';
import { PlacementTestService } from './placement-test.service';
import { PlacementTestController } from './placement-test.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([PlacementTestQuestion, PlacementTestResult]),
  ],
  controllers: [PlacementTestController],
  providers: [PlacementTestService],
  exports: [PlacementTestService],
})
export class PlacementTestModule {}