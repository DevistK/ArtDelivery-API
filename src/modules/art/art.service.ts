import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ArtDto } from '../../dto/art.dto';
import OpenAI from 'openai';
import { ResponseDto } from '../../dto/response.dto';
import * as process from 'process';
import { Transactional } from 'typeorm-transactional';
import { InjectRepository } from '@nestjs/typeorm';
import { GenerateImage } from '../../repository/generateImage/entity/generateImage.entity';
import { Repository } from 'typeorm';
import GenerateImageQuery from '../../repository/generateImage/generateImage.query';
import { User } from '../../repository/user/entity/user.entity';
import { ArchiveService } from '../archive/archive.service';
import { generateExpiryDate } from '../../common/utils/generateExpiryDate';
import UserQuery from '../../repository/user/user.query';
import { PointConfig } from '../../repository/pointConfig/entity/pointConfig.entity';
import PointConfigQuery from '../../repository/pointConfig/pointConfig.query';
import PointLogQuery from '../../repository/pointLog/pointLog.query';
import { PointLog } from '../../repository/pointLog/entity/pointLog.entity';

@Injectable()
export class ArtService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  constructor(
    @InjectRepository(GenerateImage)
    private generateImageRepository: Repository<GenerateImage>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(PointConfig)
    private pointConfigRepository: Repository<PointConfig>,
    @InjectRepository(PointLog)
    private pointLogRepository: Repository<PointLog>,
    private archiveService: ArchiveService,
  ) {}

  @Transactional()
  async generate(user: User, data: ArtDto) {
    try {
      if (user.point <= 0) {
        throw new HttpException(
          'The point does not exist ',
          HttpStatus.FORBIDDEN,
        );
      }

      const image = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: data.prompt,
        size: data.size,
        quality: data.quality,
        style: data.style,
        response_format: 'b64_json',
        n: 1,
      });

      const base64Data = image.data[0].b64_json;
      const decodedData = Buffer.from(base64Data, 'base64');

      const blob = new Blob([decodedData]);
      const img = URL.createObjectURL(blob);

      const generateImageData = await GenerateImageQuery.addGenerateImage(
        this.generateImageRepository,
        img,
        data.prompt,
        data.size,
        data.quality,
        data.style,
        user,
      );
      const expDate = generateExpiryDate();

      await this.archiveService.addArchive(generateImageData.id, expDate, user);

      const deductPoint = await PointConfigQuery.getDeductPoint(
        this.pointConfigRepository,
        data.size,
        data.quality,
        data.style,
      );

      if (user.point > 0 && user.point > deductPoint.deductPoints) {
        const point = user.point - deductPoint.deductPoints;
        await UserQuery.updateUserPoint(this.userRepository, point, user.id);

        await PointLogQuery.addPointLog(
          this.pointLogRepository,
          deductPoint.deductPoints,
          user,
        );

        const newCount = user.count + 1;

        await UserQuery.updateUserCount(this.userRepository, newCount, user.id);
      }

      return new ResponseDto(200, image.data[0].b64_json, 'result image');
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
