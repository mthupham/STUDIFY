import {ConfigModule, ConfigService} from '@nestjs/config';
import {SequelizeModuleOptions} from '@nestjs/sequelize';
import {Dialect} from 'sequelize';

export const sequelizeConfig = (configService: ConfigService): SequelizeModuleOptions => ({
    database: configService.get<string>('DB_NAME'),
    username: configService.get<string>('DB_USERNAME'),
    //password: configService.get<string>('DB_PASSWORD'),
    // 🔥 CHÌA KHÓA Ở ĐÂY: Ép kiểu String và dùng fallback '' để không bao giờ bị undefined
    password: String(configService.get<string>('DB_PASSWORD') ?? ''),
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT') ? Number(configService.get<number>('DB_PORT')) : 5432,
    dialect: configService.get<Dialect>('DB_DIALECT') ?? 'postgres',

})