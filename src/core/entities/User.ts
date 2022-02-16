import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { v4 as uuid } from 'uuid';

import { Upload } from './Upload';

/**
 * @class User
 */
@Entity({ name: 'users' })
class User {
  @PrimaryColumn()
  id: string;

  /**
   * @public constructor
   */
  public constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  @Column()
  name: string;

  @Column()
  full_name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    default: false,
  })
  is_admin?: boolean;

  @Column({
    default: null,
  })
  avatar_id?: string;

  @OneToOne(() => Upload)
  @JoinColumn({ name: 'avatar_id' })
  avatar: Upload;

  @OneToMany(() => Upload, (upload) => upload.owner)
  uploads: Upload[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { User };
