import { getCustomRepository } from 'typeorm';
import { BadRequest } from 'http-errors';

import { TagRepositories } from '@repositories/TagRepositories';

/**
 * @interface ITag
 */
export interface ITag {
  id?: string;
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * @class  CreateTagService
 */
export class CreateTagService {
  private message: string = 'Tag already exists, no changes applied!';

  public constructor(
    public repositories = getCustomRepository(TagRepositories)
  ) {}

  async execute({ name, description }: ITag) {
    const tag = await this.repositories.findOne({
      where: {
        name,
      },
      select: ['id'],
    });

    /** @TODO Return a error message */
    if (tag) throw new BadRequest(this.message);

    const tagInstance = this.repositories.create({
      name,
      description,
    });

    return await this.repositories.save(tagInstance);
  }
}
