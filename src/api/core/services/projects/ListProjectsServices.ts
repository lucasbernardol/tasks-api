import { getCustomRepository } from 'typeorm';
import { paginate } from 'paging-util';

import { ProjectRepositories } from '@repositories/ProjectRepositories';
import { pagingUtilFixed, pagingUtilNormalize } from '@shared/utils/paging';

export interface IPagingOptions {
  page: number;
  limit: number;

  setRange?: boolean;
  max?: number;
  min?: number;
}

/**
 * @class ListProjectsServices
 */
export class ListProjectsServices {
  public constructor(
    public repositories = getCustomRepository(ProjectRepositories)
  ) {}

  async execute(ownerId: string, options: IPagingOptions) {
    const filter = {
      owner_id: ownerId,
    };

    /** Paging */
    const { page, limit, ...optionsRest } = options;

    const records = await this.repositories.count({ where: filter });

    const { offset, constants, ...paging } = paginate({
      records,
      page,
      limit,
      ...optionsRest,
    });

    const projects = await this.repositories.find({
      where: filter,
      take: paging.limit,
      skip: offset,
    });

    /** @TODO Add pagination metadata */
    let metadata: object;

    const pagination = records ? pagingUtilNormalize(paging) : null;
    const fixed = pagingUtilFixed(constants);

    const recordsCountGreaterThanOne = records >= 1;

    if (recordsCountGreaterThanOne) {
      metadata = { pagination, fixed };
    }

    return {
      projects,
      metadata,
    };
  }
}
