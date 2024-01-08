import { Module } from '@nestjs/common';
import { DataBaseService } from './database.service';

@Module({
  providers: [DataBaseService],
  exports: [DataBaseService],
})
export class DatabaseModule {}
