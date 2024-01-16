import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointConfig } from '../../repository/pointConfig/entity/pointConfig.entity';
import { PointLog } from '../../repository/pointLog/entity/pointLog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PointConfig, PointLog])],
  providers: [PointService],
  exports: [PointService],
})
export class PointModule {}
