import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Oauth } from '../../oauth/entity/oauth.entity';
import { PointLog } from '../../pointLog/entity/pointLog.entity';
import { GenerateImage } from '../../generateImage/entity/generateImage.entity';
import { Archive } from '../../archive/entity/archive.entity';

@Entity({ schema: 'art_delivery', name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  photo: string;

  @Column({ default: 10000 })
  point: number;

  @Column({ default: 0 })
  count: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToMany(() => Oauth, (oauth) => oauth.user)
  @JoinColumn({
    name: 'oauth_id',
    referencedColumnName: 'id',
  })
  oauth: Oauth[];

  @OneToMany(() => GenerateImage, (genImg) => genImg.user)
  @JoinColumn({
    name: 'generateImage_id',
    referencedColumnName: 'id',
  })
  generateImages: GenerateImage[];

  @OneToMany(() => Archive, (archive) => archive.user)
  @JoinColumn({
    name: 'archive_id',
    referencedColumnName: 'id',
  })
  archive: Archive[];

  @OneToMany(() => PointLog, (pointLog) => pointLog.user)
  @JoinColumn({
    name: 'pointLog_id',
    referencedColumnName: 'id',
  })
  pointLog: PointLog[];
}
