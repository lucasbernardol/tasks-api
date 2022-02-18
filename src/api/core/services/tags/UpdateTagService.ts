import { getCustomRepository } from 'typeorm';

import { TagRepositories } from '@repositories/TagRepositories';

/**
 * @interface ITag
 */
export interface ITagUpdate {
  description: string;
}

/**
 * @class UpdateTagService
 */
export class UpdateTagService {
  public constructor(
    public repositories = getCustomRepository(TagRepositories)
  ) {}

  // prettier-ignore
  async execute(id: string, { description }: ITagUpdate): Promise<{ updated: boolean }> {
    const updateResult = await this.repositories.update(id, {
      description,
    });

    return {
      updated: Boolean(updateResult.affected),
    };
  }
}
