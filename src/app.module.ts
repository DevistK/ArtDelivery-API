import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtModule } from './art/art.module';

@Module({
  imports: [ArtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
