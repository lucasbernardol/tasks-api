import { getCustomRepository } from 'typeorm';
import { paginate } from 'paging-util';

import { TagRepositories } from '@repositories/TagRepositories';
import { normalize, normalizeFized } from '@utils/pagingNormalize';

export interface IPaging {
  page: number;
  limit: number;
  setRange?: boolean;
  max?: number;
  min?: number;
}

/**
 * @class CreateTagsServices
 */
export class ListTagsServices {
  public constructor(
    public repositories = getCustomRepository(TagRepositories)
  ) {}

  async execute(pagingOptions: IPaging) {
    const { page, limit, ...rest } = pagingOptions;

    /** All records */
    const records = await this.repositories.count();

    const normalizedOptions = { records, page, limit, ...rest };

    const { offset, constants, ...paging } = paginate(normalizedOptions);

    const tags = await this.repositories.find({
      take: paging.limit,
      skip: offset,
    });

    /** @TODO Normalize || recods >= 1  */
    const pagination = records ? normalize(paging) : null;

    const fixed = normalizeFized(constants);

    const metadata = records ? { pagination, fixed } : null;

    return {
      tags,
      metadata,
    };
  }
}
