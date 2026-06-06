import { Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import {sequelizeConfig} from './config/sequelize.config';
   

@Module({
    imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) : SequelizeModuleOptions => 
                sequelizeConfig(configService)
            
        })
    ],
})
export class AppModule {}
