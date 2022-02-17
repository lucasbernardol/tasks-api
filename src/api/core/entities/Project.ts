import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

import { User } from './User';
import { Tag } from './Tag';

/**
 * @class Project
 */
@Entity({ name: 'projects' })
class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  owner_id: string;

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(() => User)
  owner: User;

  @Column()
  tag_id: string;

  @JoinColumn({ name: 'tag_id' })
  @ManyToOne(() => Tag)
  tag: Tag;

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

export { Project };
