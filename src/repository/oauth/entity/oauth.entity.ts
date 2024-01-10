import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OAuth } from '../../../constant/enum';
import { User } from '../../user/entity/user.entity';

@Entity({ schema: 'dalle3-gen', name: 'oauth' })
export class Oauth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index()
  provideId: number;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column({
    type: 'enum',
    enum: OAuth,
  })
  type: OAuth;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => User, (user) => user.oauth)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;
}
