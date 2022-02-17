import { getCustomRepository } from 'typeorm';

import { ProjectRepositories } from '@repositories/ProjectRepositories';

/**
 * @class FindProjectsByIdServices
 */
export class FindProjectsByIdServices {
  public constructor(
    public repositories = getCustomRepository(ProjectRepositories)
  ) {}

  async execute(id: string) {
    const project = await this.repositories.findOne({ id });

    return project ?? null;
  }
}
