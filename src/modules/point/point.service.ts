import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PointConfig } from '../../repository/pointConfig/entity/pointConfig.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(PointConfig)
    private pointConfigRepository: Repository<PointConfig>,
  ) {}
}
