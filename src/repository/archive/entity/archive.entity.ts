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
import { User } from '../../user/entity/user.entity';

@Entity({ schema: 'art_delivery', name: 'archive' })
export class Archive {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  generateImageId: number;

  @Column()
  isDeleted: boolean;

  @Column()
  expirationDate: Date;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => User, (user) => user.archive)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;
}
