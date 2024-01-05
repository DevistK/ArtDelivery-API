import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ArtDto } from '../dto/art.dto';
import OpenAI from 'openai';
import { ResponseDto } from '../dto/response.dto';
import { Size } from '../constant/enum';

@Injectable()
export class ArtService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  async generate(data: ArtDto) {
    try {
      const image = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: data.prompt,
        size: Size[data.size],
        quality: data.quality,
        style: data.style,
        n: 1,
      });

      return new ResponseDto(200, image.data[0].url, 'result image');
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
