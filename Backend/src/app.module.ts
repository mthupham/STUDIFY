// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { PlacementTestModule } from './features/placement-test/placement-test.module';
// @Module({
//   imports: [PlacementTestModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacementTestModule } from './features/placement-test/placement-test.module';
import { sequelizeConfig } from './config/sequelize.config';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres', // <--- THÊM DÒNG NÀY (hoặc 'mysql' nếu dự án bạn dùng MySQL)
      ...sequelizeConfig,
      autoLoadModels: true,
      synchronize: true,
    }),
    PlacementTestModule,
    RoadmapModule,
    LessonModule, // <-- Thêm LessonModule vào đây
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}