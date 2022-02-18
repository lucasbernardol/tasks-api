import { getCustomRepository } from 'typeorm';
import { paginate } from 'paging-util';

import { TagRepositories } from '@repositories/TagRepositories';

import { IPagingOptions } from '@shared/types/IPagingOptions';
import { pagingUtilFixed, pagingUtilNormalize } from '@shared/utils/paging';

/**
 * @class ListTagsServices
 */
export class ListTagsServices {
  public constructor(
    public repositories = getCustomRepository(TagRepositories)
  ) {}

  async execute(options: IPagingOptions) {
    const records = await this.repositories.count();

    const { offset, constants, ...paging } = paginate({ records, ...options });

    const tags = await this.repositories.find({
      take: paging.limit,
      skip: offset,
    });

    /** @TODO paging  */
    let metadata: object;

    const recordsTotalGreaterThanOne = records >= 1;

    if (recordsTotalGreaterThanOne) {
      const pagination = pagingUtilNormalize(paging);
      const fixed = pagingUtilFixed(constants);

      metadata = { pagination, fixed };
    }

    return {
      tags,
      metadata,
    };
  }
}
