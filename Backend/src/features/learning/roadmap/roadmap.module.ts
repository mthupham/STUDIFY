import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoadmapController } from './roadmap.controller';
import { RoadmapService } from './roadmap.service';
import { RoadmapLevel } from './models/roadmap-level.model';
import { RoadmapLesson } from './models/roadmap-lesson.model';

@Module({
  imports: [SequelizeModule.forFeature([RoadmapLevel, RoadmapLesson])],
  controllers: [RoadmapController],
  providers: [RoadmapService],
  exports: [RoadmapService],
})
export class RoadmapModule {}