import { getCustomRepository } from 'typeorm';
import { paginate } from 'paging-util';

import { ProjectRepositories } from '@repositories/ProjectRepositories';

import { pagingUtilNormalize, pagingUtilFixed } from '@shared/utils/paging';

export interface IPagingOptions {
  page: number;
  limit: number;

  setRange?: boolean;
  max?: number;
  min?: number;
}

export interface IProjectFindByTagOptions {
  owner_id: string;
  tag_id: string;
}

export class FindProjectsByTagServices {
  public constructor(
    public repositories = getCustomRepository(ProjectRepositories)
  ) {}

  async execute(
    options: IProjectFindByTagOptions,
    pagingOptions: IPagingOptions
  ) {
    const { owner_id, tag_id } = options;

    const { page, limit, ...rest } = pagingOptions;

    /** @TODO typeORM filter */
    const filter = {
      owner_id,
      tag_id,
    };

    const records = await this.repositories.count({
      where: filter,
    });

    const pagingNormalizedOptions = { records, page, limit, ...rest };

    const { offset, constants, ...paging } = paginate(pagingNormalizedOptions);

    const projects = await this.repositories.find({
      where: filter,
      take: paging.limit,
      skip: offset,

      relations: ['tag'],
    });

    const pagination = records ? pagingUtilNormalize(paging) : null;

    const fixed = pagingUtilFixed(constants);

    const metadata = records ? { pagination, fixed } : null;

    return {
      projects,
      metadata,
    };
  }
}
