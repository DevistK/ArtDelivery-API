import { Repository } from 'typeorm';
import { PointLog } from './entity/pointLog.entity';
import { User } from '../user/entity/user.entity';

export default class PointLogQuery {
  static addPointLog = (
    pointLogRepository: Repository<PointLog>,
    awardingPoint: number,
    user: User,
  ) => {
    return pointLogRepository.insert({
      awardingPoint,
      user,
    });
  };
}
