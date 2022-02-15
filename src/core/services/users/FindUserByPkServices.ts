import { instanceToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';

import { UserRepositories } from '@repositories/UserRepositories';

/**
 * @class FindUserByPkServices
 */
export class FindUserByPkServices {
  public constructor(
    public repostiroies = getCustomRepository(UserRepositories)
  ) {}

  async execute(id: string) {
    const account = await this.repostiroies.findOne({ id });

    return account ? instanceToPlain(account) : null;
  }
}
