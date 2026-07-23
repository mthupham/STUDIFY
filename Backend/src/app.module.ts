import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacementTestModule } from './features/placement-test/placement-test.module';
import { sequelizeConfig } from './config/sequelize.config';
import { RoadmapModule } from './features/learning/roadmap/roadmap.module';
import { LessonModule } from './features/learning/lesson/lesson.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...sequelizeConfig(configService),
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    PlacementTestModule,
    RoadmapModule,
    LessonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}