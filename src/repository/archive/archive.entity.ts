import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/entity/user.entity';
import { GenerateImage } from '../image/generateImage.entity';

@Entity({ schema: 'dalle3-gen', name: 'archive' })
export class Archive {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isDeleted: boolean;

  @Column()
  expiration_date: Date;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToMany(() => GenerateImage, (image) => image.archive)
  @JoinColumn({
    name: 'archive_id',
    referencedColumnName: 'id',
  })
  generateImages: GenerateImage[];

  @ManyToOne(() => User, (user) => user.archive)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;
}
