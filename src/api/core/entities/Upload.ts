import {
  Entity,
  PrimaryColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { Expose } from 'class-transformer';

import { filesUploadsURL } from '@constants/url';
import { User } from './User';

/**
 * @class Upload
 */
@Entity({ name: 'uploads' })
class Upload {
  @PrimaryColumn()
  id: string;

  @Column()
  filename: string;

  @Expose({ toPlainOnly: true, name: 'url' })
  public url(): string {
    return filesUploadsURL + this.filename;
  }

  @Column()
  originalname: string;

  @Column()
  bytes: number;

  @Column()
  mimetype: string;

  @Column()
  owner_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  public constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Upload };
