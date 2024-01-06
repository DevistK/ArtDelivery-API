import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ArtDto } from '../dto/art.dto';
import OpenAI from 'openai';
import { ResponseDto } from '../dto/response.dto';

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
        size: data.size,
        quality: data.quality,
        style: data.style,
        response_format: 'b64_json',
        n: 1,
      });

      return new ResponseDto(200, image.data[0].b64_json, 'result image');
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
