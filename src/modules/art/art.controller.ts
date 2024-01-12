import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArtDto } from '../../dto/art.dto';
import { ArtService } from './art.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { GetJwt } from '../../decorators/jwt.decorator';
import { User } from '../../repository/user/entity/user.entity';

@Controller('art')
export class ArtController {
  constructor(private artService: ArtService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async generateArt(@GetJwt() user: User, @Body() data: ArtDto) {
    return this.artService.generate(user, data);
  }
}
