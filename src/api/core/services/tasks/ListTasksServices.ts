import { getCustomRepository } from 'typeorm';
import { paginate } from 'paging-util';

import { TaskRepositories } from '@repositories/TaskRepositories';

import { pagingUtilFixed, pagingUtilNormalize } from '@shared/utils/paging';
import { IPagingOptions } from '@shared/types/IPagingOptions';

/**
 * @class ListTasksServices
 */
export class ListTasksServices {
  public constructor(
    public repositories = getCustomRepository(TaskRepositories)
  ) {}

  async execute(owner_id: string, options: IPagingOptions) {
    /** WHERE filter  */
    const filter = {
      owner_id,
    };

    const records = await this.repositories.count({ where: filter });

    const { offset, constants, ...paging } = paginate({ records, ...options });

    const tasks = await this.repositories.find({
      where: filter,
      take: paging.limit,
      skip: offset,
    });

    /** @TODO pagination metadata  */
    let metadata: object;

    const recordsTotalGreaterThanOne = records >= 1;

    if (recordsTotalGreaterThanOne) {
      const pagination = pagingUtilNormalize(paging);

      const fixed = pagingUtilFixed(constants);

      metadata = { pagination, fixed };
    }

    return {
      tasks,
      metadata,
    };
  }
}
