import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Archive } from '../../repository/archive/entity/archive.entity';
import { Repository } from 'typeorm';
import { User } from '../../repository/user/entity/user.entity';
import ArchiveQuery from '../../repository/archive/archive.query';

@Injectable()
export class ArchiveService {
  constructor(
    @InjectRepository(Archive)
    private archiveRepository: Repository<Archive>,
  ) {}

  async addArchive(generateImageId: number, expirationDate: Date, user: User) {
    return await ArchiveQuery.addArchive(
      this.archiveRepository,
      generateImageId,
      expirationDate,
      user,
    );
  }
}
