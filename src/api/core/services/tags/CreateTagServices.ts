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
 * @class  CreateTagServices
 */
export class CreateTagServices {
  public constructor(
    public repositories = getCustomRepository(TagRepositories)
  ) {}

  async execute(tag: ITag) {
    const { name, description } = tag;

    const tagExists = await this.repositories.findOne({ name });

    if (tagExists) {
      /** @TODO Return a error message */
      throw new BadRequest('Tag name already exists!');
    }

    const tagInstance = this.repositories.create({
      name,
      description,
    });

    const tagInstanceSaved = await this.repositories.save(tagInstance);

    return tagInstanceSaved;
  }
}
