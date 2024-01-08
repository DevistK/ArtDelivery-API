import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Archive } from '../archive/archive.entity';
import { Quality, Size, Style } from '../../constant/enum';

@Entity({ schema: 'dalle3-gen', name: 'generate_image' })
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

  @ManyToOne(() => Archive, (archive) => archive.generateImages)
  @JoinColumn({
    name: 'archive_id',
    referencedColumnName: 'id',
  })
  archive: Archive;
}
