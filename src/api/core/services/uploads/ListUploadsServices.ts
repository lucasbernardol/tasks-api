import { instanceToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { paginate } from 'paging-util';

import { UploadRepositories } from '@repositories/UploadRepositories';
import { pagingUtilFixed, pagingUtilNormalize } from '@shared/utils/paging';

export interface IPaging {
  page: number;
  limit: number;
  setRange?: boolean;
  max?: number;
  min?: number;
}

/**
 * @class ListUploadsServices
 */
export class ListUploadsServices {
  public constructor(
    public repositories = getCustomRepository(UploadRepositories)
  ) {}

  async execute(owner_id: string, pagingOptions: IPaging) {
    const { page, limit, ...rest } = pagingOptions;

    const records = await this.repositories.count({
      owner_id,
    });

    const pagingAlgorithmOptions = { records, page, limit, ...rest };

    const { offset, constants, ...paging } = paginate(pagingAlgorithmOptions);

    const uploads = await this.repositories.find({
      where: {
        owner_id,
      },

      take: paging.limit,
      skip: offset,
    });

    /** @TODO paging */
    const pagination = records ? pagingUtilNormalize(paging) : null;

    const fixed = pagingUtilFixed(constants);

    const metadata = records ? { pagination, fixed } : null;

    return {
      uploads: instanceToPlain(uploads),
      metadata,
    };
  }
}
