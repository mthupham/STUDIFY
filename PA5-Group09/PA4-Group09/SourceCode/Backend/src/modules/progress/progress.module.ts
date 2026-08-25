import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { UserProgress } from '../../models/user_progress.model';

@Module({
  imports: [SequelizeModule.forFeature([UserProgress])],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}