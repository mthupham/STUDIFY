import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlacementTestQuestion } from '../../models/placement_test_question.model';
import { PlacementTestResult } from '../../models/placement_test_result.model';
import { PlacementTestService } from './placement-test.service';
import { PlacementTestController } from './placement-test.controller';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([PlacementTestQuestion, PlacementTestResult]),
    UserModule,
  ],
  controllers: [PlacementTestController],
  providers: [PlacementTestService],
  exports: [PlacementTestService],
})
export class PlacementTestModule {}