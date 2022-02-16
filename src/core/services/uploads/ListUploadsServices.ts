import { instanceToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { paginate } from 'paging-util';

import { UploadRepositories } from '@repositories/UploadRepositories';
import { normalize, normalizeFized } from '@utils/pagingNormalize';

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
    const pagination = records ? normalize(paging) : null;

    const fixed = normalizeFized(constants);

    const metadata = records ? { pagination, fixed } : null;

    return {
      uploads: instanceToPlain(uploads),
      metadata,
    };
  }
}
