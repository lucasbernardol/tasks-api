import { getCustomRepository } from 'typeorm';

import { TaskRepositories } from '@repositories/TaskRepositories';
import { IPagingOptions } from '@shared/types/IPagingOptions';
import { paginate } from 'paging-util';
import { pagingUtilFixed, pagingUtilNormalize } from '@shared/utils/paging';

export interface IListByProjectsFilter {
  project_id: string;
  owner_id: string;
}

/**
 * @class ListTasksByProjectServices
 */
export class ListTasksByProjectServices {
  public constructor(
    public repositories = getCustomRepository(TaskRepositories)
  ) {}

  async execute(filter: IListByProjectsFilter, options: IPagingOptions) {
    const { owner_id, project_id } = filter;

    const whereFilter = {
      owner_id,
      project_id,
    };

    const records = await this.repositories.count({ where: whereFilter });

    const { offset, constants, ...paging } = paginate({ records, ...options });

    const tasks = await this.repositories.find({
      where: whereFilter,

      take: paging.limit,
      skip: offset,
    });

    let metadata: object;
    const recordsCountGraeterThanOne = records >= 1;

    if (recordsCountGraeterThanOne) {
      const pagintion = pagingUtilNormalize(paging);

      const fixed = pagingUtilFixed(constants);

      metadata = { pagintion, fixed };
    }

    return {
      tasks,
      metadata,
    };
  }
}
