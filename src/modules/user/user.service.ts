import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../repository/user/entity/user.entity';
import UserQuery from '../../repository/user/user.query';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string) {
    return await UserQuery.getUserByEmail(this.userRepository, email);
  }

  async addUser(email: string, name: string) {
    return await UserQuery.addUser(this.userRepository, email, name);
  }
}
