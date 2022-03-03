import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { BaseEnity } from './BaseEntity';
import { Upload } from './Upload';

/**
 * @class User
 */
@Entity({ name: 'users' })
class User extends BaseEnity {
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

  @Exclude()
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
