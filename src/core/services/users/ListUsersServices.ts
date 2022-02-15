import { getCustomRepository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

import { UserRepositories } from '@repositories/UserRepositories';

/**
 * @class ListUsersServices
 */
export class ListUsersServices {
  public constructor(
    public repositories = getCustomRepository(UserRepositories)
  ) {}

  async execute() {
    const users = await this.repositories.find();

    return instanceToPlain(users);
  }
}
