import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

/**
 * @class Tag
 */
@Entity({ name: 'tags' })
class Tag {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

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

export { Tag };
