import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  generateJwt(payload: any) {
    return this.jwtService.sign(payload);
  }

  async signIn(data: any) {
    if (!data) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.userService.getUserByEmail(data.email);

    if (!userExists) {
      return this.signUp(data);
    }

    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
      name: userExists.name,
    });
  }

  async signUp(data: any) {
    try {
      console.log('signUp ???', data);
      const newAccount = await this.userService.addUser(data.email, data.name);

      return this.generateJwt({
        sub: newAccount.id,
        email: newAccount.email,
        name: newAccount.name,
      });
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
