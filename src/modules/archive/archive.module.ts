import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archive } from '../../repository/archive/entity/archive.entity';
import { ArchiveService } from './archive.service';
import { ArchiveController } from './archive.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Archive])],
  controllers: [ArchiveController],
  exports: [ArchiveService],
})
export class ArchiveModule {}
