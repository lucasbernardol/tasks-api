import { getCustomRepository } from 'typeorm';

import { ProjectRepositories } from '@repositories/ProjectRepositories';

/**
 * @interface ISetProjectBanner
 */
export interface ISetProjectBanner {
  projectId: string;
  bannerId: string;
}

/**
 * @class SetProjectBannerService
 */
export class SetProjectBannerService {
  public constructor(
    private repositories = getCustomRepository(ProjectRepositories)
  ) {}

  /**
   * @method execute - main method
   **/
  async execute({ projectId, bannerId }: ISetProjectBanner) {
    const update = await this.repositories.update(projectId, {
      banner_id: bannerId,
    });

    const updated = Boolean(update.affected);

    return {
      updated,
    };
  }
}
