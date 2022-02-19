import { getCustomRepository } from 'typeorm';

import { TagRepositories } from '@repositories/TagRepositories';

/**
 * @interface ITag
 */
export interface ITagUpdate {
  description: string;
  color: string;
}

/**
 * @class UpdateTagService
 */
export class UpdateTagService {
  public constructor(
    public repositories = getCustomRepository(TagRepositories)
  ) {}

  async execute(
    id: string,
    { description, color }: ITagUpdate
  ): Promise<{ updated: boolean }> {
    const updateResult = await this.repositories.update(id, {
      description,
      color,
    });

    return {
      updated: Boolean(updateResult.affected),
    };
  }
}
