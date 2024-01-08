import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity({ schema: 'dalle3-gen', name: 'invite' })
export class Invite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inviteCode: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToOne(() => User, (user) => user.invite)
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'id' })
  user: User;
}
