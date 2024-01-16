import { Repository } from 'typeorm';
import { Quality, Size, Style } from '../../constant/enum';
import { PointConfig } from '../pointConfig/entity/pointConfig.entity';

export default class PointConfigQuery {
  static getDeductPoint = (
    pointConfigRepository: Repository<PointConfig>,
    size: Size,
    quality: Quality,
    style: Style,
  ) => {
    return pointConfigRepository.findOne({
      where: {
        size: size,
        quality: quality,
        style: style,
      },
    });
  };
}
