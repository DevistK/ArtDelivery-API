import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Quality, Size, Style } from '../../../constant/enum';
import { User } from '../../user/entity/user.entity';

@Entity({ schema: 'art_delivery', name: 'generate_image' })
export class GenerateImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buffer: string;

  @Column()
  prompt: string;

  @Column({
    type: 'enum',
    enum: Size,
  })
  size: Size;

  @Column({
    type: 'enum',
    enum: Quality,
  })
  quality: Quality;

  @Column({
    type: 'enum',
    enum: Style,
  })
  style: Style;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => User, (user) => user.generateImages)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;
}
