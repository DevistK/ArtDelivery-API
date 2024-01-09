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
import { Archive } from '../../archive/archive.entity';

@Entity({ schema: 'dalle3-gen', name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

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
