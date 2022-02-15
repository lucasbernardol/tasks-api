import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  discription: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Tag };
