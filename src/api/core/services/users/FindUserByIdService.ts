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
    const account = await this.repositories.findAndIgnoreFields(id);

    return account ?? null;
  }
}
