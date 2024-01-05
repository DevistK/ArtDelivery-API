import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ArtDto } from '../dto/art.dto';
import OpenAI from 'openai';
import { ResponseDto } from '../dto/response.dto';

@Injectable()
export class ArtService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  public generate(data: ArtDto) {
    try {
      // const image = await this.openai.images.generate({
      //   model: 'dall-e-3',
      //   prompt: data.prompt,
      //   size: data.size,
      //   quality: data.quality,
      //   style: data.style,
      //   n: 1,
      // });
      //
      // return image.data[0].url;
      return new ResponseDto(
        200,
        'https://via.placeholder.com/150',
        'result image',
      );
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
