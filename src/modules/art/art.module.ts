import { Module } from '@nestjs/common';
import { ArtController } from './art.controller';
import { ArtService } from './art.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerateImage } from '../../repository/generateImage/entity/generateImage.entity';
import { ArchiveModule } from '../archive/archive.module';
import { User } from '../../repository/user/entity/user.entity';
import { PointConfig } from '../../repository/pointConfig/entity/pointConfig.entity';
import { PointLog } from '../../repository/pointLog/entity/pointLog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GenerateImage, User, PointConfig, PointLog]),
    ArchiveModule,
  ],
  controllers: [ArtController],
  providers: [ArtService],
  exports: [ArtService],
})
export class ArtModule {}
