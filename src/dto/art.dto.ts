import { IsNotEmpty, IsString } from 'class-validator';
import { Quality, Size, Style } from '../constant/enum';

export class ArtDto {
  @IsString()
  @IsNotEmpty()
  size: Size;

  @IsString()
  @IsNotEmpty()
  quality: Quality;

  @IsString()
  @IsNotEmpty()
  style: Style;

  @IsString()
  @IsNotEmpty()
  prompt: string;
}
