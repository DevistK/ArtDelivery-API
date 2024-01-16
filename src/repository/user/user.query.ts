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
    photo: string,
  ): Promise<User> => {
    return userRepository.save({
      email,
      name,
      photo,
      point: 10000,
    });
  };

  static updateUserCount = (
    userRepository: Repository<User>,
    count: number,
    userId: number,
  ) => {
    return userRepository.update(
      {
        id: userId,
      },
      {
        count: count,
      },
    );
  };

  static updateUserPoint = (
    userRepository: Repository<User>,
    point: number,
    userId: number,
  ) => {
    return userRepository.update(
      {
        id: userId,
      },
      {
        point: point,
      },
    );
  };
}
