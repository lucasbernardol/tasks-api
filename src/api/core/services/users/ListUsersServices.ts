import { getCustomRepository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { paginate } from 'paging-util';

import { UserRepositories } from '@repositories/UserRepositories';

import { IPagingOptions } from '@shared/types/IPagingOptions';
import { pagingUtilFixed, pagingUtilNormalize } from '@shared/utils/paging';

/**
 * @class ListUsersServices
 */
export class ListUsersServices {
  public constructor(
    public repositories = getCustomRepository(UserRepositories)
  ) {}

  async execute(options: IPagingOptions) {
    const records = await this.repositories.count();

    const { offset, constants, ...paging } = paginate({ records, ...options });

    const users = await this.repositories.find({
      take: paging.limit,
      skip: offset,
    });

    /** @TODO paging  */
    let metadata: object;

    const recodsGreaterThanOne = records >= 1;

    if (recodsGreaterThanOne) {
      const pagination = pagingUtilNormalize(paging);

      const fixed = pagingUtilFixed(constants);

      metadata = { pagination, fixed };
    }

    return {
      users: instanceToPlain(users),
      metadata,
    };
  }
}
