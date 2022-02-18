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

import { Project } from './Project';
import { User } from './User';

/**
 * @class Task
 */
@Entity({ name: 'tasks' })
class Task {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  details: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  owner_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column()
  project_id: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /**
   * @pbulic constructor
   */
  public constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Task };
