import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../repository/user/entity/user.entity';
import UserQuery from '../../repository/user/user.query';
import { ResponseDto } from '../../dto/response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string) {
    return await UserQuery.getUserByEmail(this.userRepository, email);
  }

  async getUserInfo(user: User) {
    const checkedUser = await UserQuery.getUserByEmail(
      this.userRepository,
      user.email,
    );

    if (!checkedUser) throw new HttpException('User Not found', 404);

    const data = {
      id: user.id,
      email: user.email,
      name: user.name,
      point: user.point,
      photo: user.photo,
      generateCount: user.count,
    };

    return new ResponseDto(200, data, 'response user info');
  }

  async addUser(email: string, name: string, photo: string) {
    return await UserQuery.addUser(this.userRepository, email, name, photo);
  }
}
