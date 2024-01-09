import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArtModule } from './modules/art/art.module';
import { DatabaseModule } from './provider/database/database.module';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseService } from './provider/database/database.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppService } from './app.service';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { GoogleOauthStrategy } from './modules/auth/strategies/google-oauth.strategy';

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
    DatabaseModule,
    AuthModule,
    UserModule,
    ArtModule,
  ],
  controllers: [],
  providers: [AppService, JwtStrategy, GoogleOauthStrategy],
})
export class AppModule {}
