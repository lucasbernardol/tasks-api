import { getCustomRepository } from 'typeorm';

import { ProjectRepositories } from '@repositories/ProjectRepositories';

/**
 * @class FindProjectByIdService
 */
export class FindProjectByIdService {
  public constructor(
    public repositories = getCustomRepository(ProjectRepositories)
  ) {}

  /**
   * @method execute - main method
   * @param id - Project id: `PK`
   */
  async execute(id: string) {
    const project = await this.repositories.findOne({
      where: { id },
      relations: ['banner', 'tasks'],
    });

    return project ?? null;
  }
}
