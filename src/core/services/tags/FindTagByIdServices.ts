import { getCustomRepository } from 'typeorm';

import { TagRepositories } from '@repositories/TagRepositories';

/**
 * @class FindTagByIdServices
 */
export class FindTagByIdServices {
  public constructor(
    public repositories = getCustomRepository(TagRepositories)
  ) {}

  /** @method execute -  main method */
  async execute(id: string) {
    const tagResourceFound = await this.repositories.findOne({ id });

    return tagResourceFound ?? null;
  }
}
