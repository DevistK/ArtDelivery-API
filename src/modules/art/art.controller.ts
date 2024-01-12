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

@Controller('art')
export class ArtController {
  constructor(private artService: ArtService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async generateArt(@Body() data: ArtDto) {
    return this.artService.generate(data);
  }
}
