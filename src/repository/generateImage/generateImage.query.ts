import { GenerateImage } from './entity/generateImage.entity';
import { Repository } from 'typeorm';
import { Quality, Size, Style } from '../../constant/enum';
import { User } from '../user/entity/user.entity';

export default class GenerateImageQuery {
  static getGenerateImageByCount = (
    generateImageRepository: Repository<GenerateImage>,
    user: User,
  ) => {
    return generateImageRepository.count({
      where: {
        user,
      },
    });
  };
  static addGenerateImage = (
    generateImageRepository: Repository<GenerateImage>,
    buffer: string,
    prompt: string,
    size: Size,
    quality: Quality,
    style: Style,
    user: User,
  ): Promise<GenerateImage> => {
    return generateImageRepository.save({
      buffer: buffer,
      prompt: prompt,
      size: size,
      quality: quality,
      style: style,
      user: user,
    });
  };
}
