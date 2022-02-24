import { getCustomRepository } from 'typeorm';

import { UserRepositories } from '@repositories/UserRepositories';

/**
 * @class FindUserByPkService
 */
export class FindUserByIdService {
  public constructor(
    public repositories = getCustomRepository(UserRepositories)
  ) {}

  /** @method execute - main method */
  async execute(id: string) {
    const findToPublicView = await this.repositories.findOne({
      where: { id },
      select: [
        'id',
        'name',
        'full_name',
        'avatar_id',
        'created_at',
        'updated_at',
      ],
      relations: ['avatar'],
    });

    return findToPublicView ?? null;
  }
}
