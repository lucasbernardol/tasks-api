import { getCustomRepository } from 'typeorm';
import { Conflict } from 'http-errors';

import { TagRepositories } from '@repositories/TagRepositories';

/**
 * @interface ITag
 */
export interface ITagUpdate {
  name: string;
  description: string;
}

/**
 * @class UpdateTagService
 */
export class UpdateTagServices {
  public constructor(
    public repositories = getCustomRepository(TagRepositories)
  ) {}

  async execute(id: string, tag: ITagUpdate) {
    const { name, description } = tag;

    const findTagByName = await this.repositories.findOne({
      where: {
        name,
      },
    });

    if (findTagByName) {
      /** @TODO Return a error message  */
      throw new Conflict('Tag name already exists');
    }

    const updateResult = await this.repositories.update(id, {
      name,
      description,
    });

    return {
      updated: Boolean(updateResult.affected),
    };
  }
}
