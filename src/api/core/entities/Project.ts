import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

import { User } from './User';

import { Tag } from './Tag';

import { Upload } from './Upload';
import { Task } from './Task';

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

  public constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Project };
