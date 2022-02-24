import { instanceToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';

import { UserRepositories } from '@repositories/UserRepositories';

/**
 * @class MeUserService
 */
export class MeUserAccountService {
  public constructor(
    private repositories = getCustomRepository(UserRepositories)
  ) {}

  /**
   * @method execute - main method
   * @param id - User id: `PK`
   */
  async execute(id: string) {
    const account = await this.repositories.findOne({
      where: { id },
      relations: ['avatar'],
    });

    return account ? instanceToPlain(account) : null;
  }
}
