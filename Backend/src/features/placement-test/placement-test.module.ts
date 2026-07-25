import { Module } from '@nestjs/common';
import { PlacementTestController } from './placement-test.controller';
import { PlacementTestService } from './placement-test.service';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [PlacementTestController],
  providers: [PlacementTestService],
})
export class PlacementTestModule {}