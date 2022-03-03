import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BaseEnity } from './BaseEntity';

import { User } from './User';
import { Tag } from './Tag';

import { Upload } from './Upload';
import { Task } from './Task';

/**
 * @class Project
 */
@Entity({ name: 'projects' })
export class Project extends BaseEnity {
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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ nullable: true })
  tag_id: string;

  @ManyToOne(() => Tag)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;

  @Column({ nullable: true })
  banner_id: string;

  @ManyToOne(() => Upload)
  @JoinColumn({ name: 'banner_id' })
  banner: Upload;

  /** @description Tasks: inverse relation  */
  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
