import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

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

  @Column()
  password: string;

  @Column({
    default: false,
  })
  is_admin?: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { User };
