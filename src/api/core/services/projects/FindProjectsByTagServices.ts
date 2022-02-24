import { getCustomRepository } from 'typeorm';
import { paginate } from 'paging-util';

import { ProjectRepositories } from '@repositories/ProjectRepositories';

import { pagingUtilNormalize, pagingUtilFixed } from '@shared/utils/paging';
import { IPagingOptions } from '@shared/types/IPagingOptions';

export interface IProjectFindByTagOptions {
  owner_id: string;
  tag_id: string;
}

/**
 * @class FindProjectsByTagServices
 */
export class FindProjectsByTagServices {
  public constructor(
    public repositories = getCustomRepository(ProjectRepositories)
  ) {}

  async execute(find: IProjectFindByTagOptions, options: IPagingOptions) {
    const { owner_id, tag_id } = find;

    /** @TODO typeORM filter */
    const filter = {
      owner_id,
      tag_id,
    };

    const records = await this.repositories.count({ where: filter });

    const { offset, constants, ...paging } = paginate({ records, ...options });

    const projects = await this.repositories.find({
      where: filter,

      take: paging.limit,
      skip: offset,
      relations: ['banner'],
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
