import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BaseEnity } from './BaseEntity';
import { User } from './User';

import { Project } from './Project';

/**
 * @class Task
 */
@Entity({ name: 'tasks' })
export class Task extends BaseEnity {
  @Column()
  name: string;

  @Column()
  details: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  finish_date: number;

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
}
