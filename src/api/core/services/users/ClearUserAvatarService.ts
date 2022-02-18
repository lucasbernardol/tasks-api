import { getCustomRepository } from 'typeorm';

import { UserRepositories } from '@repositories/UserRepositories';

/**
 * @class ClearUserAvatarService
 */
export class ClearUserAvatarService {
  public constructor(
    public repositories = getCustomRepository(UserRepositories)
  ) {}

  async execute(user_id: string) {
    const deletion = await this.repositories.update(user_id, {
      avatar_id: null,
    });

    return {
      updated: Boolean(deletion.affected),
    };
  }
}
