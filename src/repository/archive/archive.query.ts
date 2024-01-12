import { Archive } from './entity/archive.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';

export default class ArchiveQuery {
  static addArchive = (
    archiveRepository: Repository<Archive>,
    generateImageId: number,
    expirationDate: Date,
    user: User,
  ) => {
    return archiveRepository.insert({
      generateImageId,
      expirationDate,
      user,
      isDeleted: false,
    });
  };
}
