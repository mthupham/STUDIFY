// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// moi them
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import các Module dự án của bạn (điều chỉnh lại đường dẫn cho đúng với thư mục của bạn)
import { PlacementTestModule } from 'src/features/placement-test/placement-test.module';
// import { AuthModule } from './modules/auth/auth.module';
// import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    // 1. Tải ConfigModule TOÀN CỤC để đọc file .env đầu tiên
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 2. Import các module chức năng khác của dự án
    PlacementTestModule,

    // Mở comment các module bên dưới nếu project của bạn có dùng:
    // AuthModule,
    // SequelizeModule.forRoot({ ... }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}