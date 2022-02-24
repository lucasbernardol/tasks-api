import { getCustomRepository } from 'typeorm';

import { ProjectRepositories } from '@repositories/ProjectRepositories';

/**
 * @class ClearProjectBannerService
 */
export class ClearProjectBannerService {
  public constructor(
    private repositories = getCustomRepository(ProjectRepositories)
  ) {}

  /**
   * @method execute - main method
   * @param id - Project id: `PK`
   */
  async execute(id: string) {
    const update = await this.repositories.update(id, {
      banner_id: null,
    });

    const updated = Boolean(update.affected);

    return {
      updated,
    };
  }
}
