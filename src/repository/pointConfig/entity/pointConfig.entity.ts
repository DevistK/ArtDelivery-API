import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Quality, Size, Style } from '../../../constant/enum';

@Entity({ schema: 'dalle3-gen', name: 'pointConfig' })
export class PointConfig {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column()
  deductPoints: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
