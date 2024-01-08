import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DataBaseService {
  constructor(private readonly config: ConfigService) {}

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.get('DB_HOST'),
      port: +this.config.get('DB_PORT'),
      username: this.config.get('DB_USER'),
      password: this.config.get('DB_PASSWORD'),
      database: this.config.get('DB_DATABASE'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
