import { Repository } from 'typeorm';
import { Oauth } from './entity/oauth.entity';
import { OAuth } from '../../constant/enum';
import { User } from '../user/entity/user.entity';

export default class OauthQuery {
  static getOauthAccessToken = (
    oAuthRepository: Repository<Oauth>,
    accessToken: string,
    provider: OAuth,
    providerId: string,
  ): Promise<Oauth> => {
    return oAuthRepository.findOne({
      where: {
        accessToken: accessToken,
        type: provider,
        provideId: providerId,
      },
    });
  };

  static addOauth = (
    oAuthRepository: Repository<Oauth>,
    accessToken: string,
    providerId: string,
    provider: OAuth,
    user: User,
  ): Promise<Oauth> => {
    return oAuthRepository.save({
      provideId: providerId,
      accessToken,
      type: provider,
      user: user,
    });
  };

  // 기존 유저가 있는데 provider 는 같은데 token 이 다르면 updateOauth 로 기존 엑세스 토큰 업데이트
}
