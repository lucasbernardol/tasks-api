import { getCustomRepository } from 'typeorm';

import { UserRepositories } from '@repositories/UserRepositories';

export interface ISetAvatar {
  user_id: string;
  avatar_id: string;
}

/**
 * @class  SetUserAvatarServices
 */
export class SetUserAvatarServices {
  public constructor(
    public repositories = getCustomRepository(UserRepositories)
  ) {}

  async execute(setAvatar: ISetAvatar) {
    const { user_id, avatar_id } = setAvatar;

    const updatedResult = await this.repositories.update(user_id, {
      avatar_id,
    });

    const updated = Boolean(updatedResult.affected);

    return {
      updated,
    };
  }
}
