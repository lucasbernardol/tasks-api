import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { Expose } from 'class-transformer';

import { filesUrl } from '@constants/url';
import { User } from './User';

@Entity({ name: 'uploads' })
class Upload {
  @PrimaryColumn()
  id: string;

  public constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  @Column()
  filename: string;

  @Expose({
    toPlainOnly: true,
    name: 'url',
  })
  public url(): string {
    /** Example: http://localhost:3333/files/filename.jpg */
    return filesUrl + this.filename;
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
}

export { Upload };
