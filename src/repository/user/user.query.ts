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
}
