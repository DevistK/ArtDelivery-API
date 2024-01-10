import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Oauth } from '../../repository/oauth/entity/oauth.entity';
import { Repository } from 'typeorm';
import OauthQuery from '../../repository/oauth/oauth.query';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Oauth)
    private oauthRepository: Repository<Oauth>,
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

    console.log('signIn ???', data);

    const isAccess = await OauthQuery.getOauthAccessToken(
      this.oauthRepository,
      data.accessToken,
      data.provider,
      data.providerId,
    );

    const userExists = await this.userService.getUserByEmail(data.email);

    if (!userExists && !isAccess) {
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
