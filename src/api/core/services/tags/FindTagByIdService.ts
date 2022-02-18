import { getCustomRepository } from 'typeorm';

import { TagRepositories } from '@repositories/TagRepositories';

/**
 * @class FindTagByIdServices
 */
export class FindTagByIdService {
  public constructor(
    public repositories = getCustomRepository(TagRepositories)
  ) {}

  /** @method execute -  main method */
  async execute(id: string) {
    const tag = await this.repositories.findOne({ id });

    return tag ?? null;
  }
}
