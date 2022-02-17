import { getCustomRepository } from 'typeorm';

import { UserRepositories } from '@repositories/UserRepositories';

/**
 * @class ClearUserAvatarServices
 */
export class ClearUserAvatarServices {
  public constructor(
    public repositories = getCustomRepository(UserRepositories)
  ) {}

  async execute(user_id: string) {
    const updateResult = await this.repositories.update(user_id, {
      avatar_id: null,
    });

    const updated = Boolean(updateResult.affected);

    return {
      updated,
    };
  }
}
