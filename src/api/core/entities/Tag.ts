import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { BaseEnity } from './BaseEntity';

/**
 * @class Tag
 */
@Entity({ name: 'tags' })
export class Tag extends BaseEnity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  color: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
