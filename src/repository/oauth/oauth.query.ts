import { Repository } from 'typeorm';
import { Oauth } from './entity/oauth.entity';
import { OAuth } from '../../constant/enum';
import { User } from '../user/entity/user.entity';

export default class OauthQuery {
  static getOauthAccessToken = (
    oAuthRepository: Repository<Oauth>,
    accessToken: string,
    provider: OAuth,
    providerId: number,
  ): Promise<Oauth> => {
    return oAuthRepository.findOne({
      where: {
        accessToken: accessToken,
        type: provider,
        provideId: providerId,
      },
    });
  };

  // 트랜잭션 처리
  // OAuth 로그인 -> 토큰 발급 -> 한번도 가입한 이력이 없으면 User 생성
  // OAuth 테이블에 해당 user , 토큰 저장

  // signIn 할때 accessToken 체크 하고 user email로 유저 체크

  // signUp 시 새 계정 auth 추가
  static addOauth = (
    oAuthRepository: Repository<Oauth>,
    accessToken: string,
    provider: OAuth,
    user: User,
  ): Promise<Oauth> => {
    return oAuthRepository.save({
      accessToken,
      type: provider,
      user: user,
    });
  };

  // 기존 유저가 있는데 provider 는 같은데 token 이 다르면 updateOauth 로 기존 엑세스 토큰 업데이트
}
