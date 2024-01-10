import { Module } from '@nestjs/common';
import { ArtModule } from './modules/art/art.module';
import { DatabaseModule } from './provider/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseService } from './provider/database/database.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppService } from './app.service';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { GoogleOauthStrategy } from './modules/auth/strategies/google-oauth.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot(new DataBaseService().getTypeOrmConfig()),
    DatabaseModule,
    AuthModule,
    UserModule,
    ArtModule,
  ],
  controllers: [],
  providers: [AppService, JwtStrategy, GoogleOauthStrategy],
})
export class AppModule {}
