import { getCustomRepository } from 'typeorm';

import { UserRepositories } from '@repositories/UserRepositories';

/**
 * @interface ISetAvatar
 */
export interface ISetAvatar {
  user_id: string;
  avatar_id: string;
}

/**
 * @class SetUserAvatarService
 */
export class SetUserAvatarService {
  public constructor(
    public repositories = getCustomRepository(UserRepositories)
  ) {}

  async execute(setAvatar: ISetAvatar): Promise<{ updated: boolean }> {
    const { user_id, avatar_id } = setAvatar;

    const updatedResult = await this.repositories.update(user_id, {
      avatar_id,
    });

    return {
      updated: Boolean(updatedResult.affected),
    };
  }
}
