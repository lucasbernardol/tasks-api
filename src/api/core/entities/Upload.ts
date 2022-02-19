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
import { User } from './User';

/**
 * @class Upload
 */
@Entity({ name: 'uploads' })
class Upload {
  @PrimaryColumn()
  id: string;

  @Column()
  public_id: string;

  @Column()
  filename: string;

  @Column()
  originalname: string;

  @Column()
  mimetype: string;

  @Column()
  bytes: number;

  @Column()
  owner_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  resource_type: string;

  @Column()
  secure_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /**
   * @public constructor
   */
  public constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Upload };
