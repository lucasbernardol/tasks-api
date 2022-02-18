import { getCustomRepository } from 'typeorm';

import { TagRepositories } from '@repositories/TagRepositories';

/**
 * @class DeleteTagService
 */
export class DeleteTagService {
  public constructor(
    public repositories = getCustomRepository(TagRepositories)
  ) {}

  async execute(id: string): Promise<{ deleted: boolean }> {
    const deletion = await this.repositories.delete({ id });

    return {
      deleted: Boolean(deletion.affected),
    };
  }
}
