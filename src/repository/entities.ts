import { User } from './user/entity/user.entity';
import { Invite } from './invite/entity/invite.entity';
import { Oauth } from './oauth/entity/oauth.entity';
import { PointLog } from './pointLog/entity/pointLog.entity';
import { PointConfig } from './pointConfig/entity/pointConfig.entity';
import { Archive } from './archive/archive.entity';
import { GenerateImage } from './image/generateImage.entity';

export const ENTITIES = [
  User,
  Invite,
  Oauth,
  PointLog,
  PointConfig,
  Archive,
  GenerateImage,
];
