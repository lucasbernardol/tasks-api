import { instanceToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';

import { UserRepositories } from '@repositories/UserRepositories';

/**
 * @class FindUserByPkServices
 */
export class FindUserByIdServices {
  public constructor(
    public repositories = getCustomRepository(UserRepositories)
  ) {}

  async execute(id: string) {
    const account = await this.repositories.findOne({
      where: {
        id,
      },
      relations: ['avatar'],
    });

    return account ? instanceToPlain(account) : null;
  }
}
