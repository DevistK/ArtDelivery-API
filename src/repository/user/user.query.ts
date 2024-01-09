import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

export default class UserQuery {
  static getUserByEmail = (
    userRepository: Repository<User>,
    email: string,
  ): Promise<User> => {
    return userRepository.findOne({
      where: {
        email: email,
      },
    });
  };

  // 트랜잭션 처리
  // OAuth 로그인 -> 토큰 발급 -> 한번도 가입한 이력이 없으면 User 생성
  // OAuth 테이블에 해당 user , 토큰 저장

  static addUser = (
    userRepository: Repository<User>,
    email: string,
    name: string,
  ): Promise<User> => {
    return userRepository.save({
      email,
      name,
      point: 10000,
    });
  };
}
