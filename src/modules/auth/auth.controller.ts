import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth/google-oauth.guard';
import { Response } from 'express';
import { ResponseDto } from '../../dto/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const clientHostUrl = process.env.CLIENT_HOST_URL;
    const token = await this.authService.signIn(req.user);

    res.cookie('access_token', token, {
      maxAge: 86400,
      sameSite: true,
      secure: false,
    });

    res.redirect(`${clientHostUrl}/oauth?token=${token}`);

    return new ResponseDto(HttpStatus.OK, null, 'OK');
  }
}
