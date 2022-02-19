import { getCustomRepository } from 'typeorm';
import { paginate } from 'paging-util';

import { UploadRepositories } from '@repositories/UploadRepositories';

import { pagingUtilFixed, pagingUtilNormalize } from '@shared/utils/paging';
import { IPagingOptions } from '@shared/types/IPagingOptions';

/**
 * @class ListUploadsServices
 */
export class ListUploadsServices {
  public constructor(
    public repositories = getCustomRepository(UploadRepositories)
  ) {}

  async execute(owner_id: string, options: IPagingOptions) {
    const records = await this.repositories.count({ owner_id });

    const { offset, constants, ...paging } = paginate({ records, ...options });

    const uploads = await this.repositories.find({
      where: {
        owner_id,
      },

      take: paging.limit,
      skip: offset,
    });

    /** @TODO paging */
    let metadata: object;

    const recordsTotalGreaterThanOne = records >= 1;

    if (recordsTotalGreaterThanOne) {
      const pagination = pagingUtilNormalize(paging);
      const fixed = pagingUtilFixed(constants);

      metadata = { pagination, fixed };
    }

    return {
      uploads,
      metadata,
    };
  }
}
