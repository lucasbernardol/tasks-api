import { getCustomRepository } from 'typeorm';

import { TagRepositories } from '@repositories/TagRepositories';

/**
 * @class DeleteTagServices
 */
export class DeleteTagServices {
  public constructor(
    public repositories = getCustomRepository(TagRepositories)
  ) {}

  async execute(id: string) {
    const deleteResult = await this.repositories.delete(id);

    const deleted = Boolean(deleteResult.affected);

    return {
      deleted,
    };
  }
}
