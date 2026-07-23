import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

export const sequelizeConfig = (configService: ConfigService): SequelizeModuleOptions => ({
    database: configService.get<string>('DB_NAME'),
<<<<<<< HEAD
    username: configService.get<string>('DB_USERNAME'),
    password: String(configService.get<string>('DB_PASSWORD') ?? ''),
=======
    username: configService.get<string>('DB_USERNAME') ?? configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
>>>>>>> d41546c24d59f4e9e3c7c3e54c23ef3805274415
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT') ? Number(configService.get<number>('DB_PORT')) : 5432,
    dialect: configService.get<Dialect>('DB_DIALECT') ?? 'postgres',
});