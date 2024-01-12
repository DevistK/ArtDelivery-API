import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ArtDto } from '../../dto/art.dto';
import OpenAI from 'openai';
import { ResponseDto } from '../../dto/response.dto';
import * as process from 'process';
import { Transactional } from 'typeorm-transactional';
import { InjectRepository } from '@nestjs/typeorm';
import { GenerateImage } from '../../repository/generateImage/entity/generateImage.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import GenerateImageQuery from '../../repository/generateImage/generateImage.query';
import { User } from '../../repository/user/entity/user.entity';
import { Archive } from '../../repository/archive/entity/archive.entity';

@Injectable()
export class ArtService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  constructor(
    @InjectRepository(GenerateImage)
    private generateImageRepository: Repository<GenerateImage>,
    @InjectRepository(Archive)
    private archiveRepository: Repository<Archive>,
    private userService: UserService,
  ) {}

  @Transactional()
  async generate(user: User, data: ArtDto) {
    try {
      const image = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: data.prompt,
        size: data.size,
        quality: data.quality,
        style: data.style,
        response_format: 'b64_json',
        n: 1,
      });

      const generateImageData = await GenerateImageQuery.addGenerateImage(
        this.generateImageRepository,
        image.data[0].b64_json,
        data.prompt,
        data.size,
        data.quality,
        data.style,
        user,
      );

      return new ResponseDto(200, image.data[0].b64_json, 'result image');
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
