import { Module } from '@nestjs/common';
import { PlacementTestController } from './placement-test.controller';
import { PlacementTestService } from './placement-test.service';

@Module({
  controllers: [PlacementTestController],
  providers: [PlacementTestService],
})
export class PlacementTestModule {}