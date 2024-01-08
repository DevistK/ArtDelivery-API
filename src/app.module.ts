import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArtModule } from './modules/art/art.module';
import { DatabaseModule } from './provider/database/database.module';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseService } from './provider/database/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        OPENAI_API_KEY: Joi.string().required(),
        GOOGLE_API_KEY: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_PASSWORD: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot(
      new DataBaseService(new ConfigService()).getTypeOrmConfig(),
    ),
    ArtModule,
    DatabaseModule,
  ],
  controllers: [],
})
export class AppModule {}
