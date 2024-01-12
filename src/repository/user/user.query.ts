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
