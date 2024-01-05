import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArtDto } from '../dto/art.dto';
import { ArtService } from './art.service';

@Controller('art')
export class ArtController {
  constructor(private artService: ArtService) {}
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async generateArt(@Body() data: ArtDto) {
    return this.artService.generate(data);
  }
}
