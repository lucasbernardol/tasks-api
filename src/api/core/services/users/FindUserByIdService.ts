import { instanceToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';

import { UserRepositories } from '@repositories/UserRepositories';

/**
 * @class FindUserByPkService
 */
export class FindUserByIdService {
  public constructor(
    public repositories = getCustomRepository(UserRepositories)
  ) {}

  /** @method execute  */
  async execute(id: string) {
    const account = await this.repositories.findOne({
      where: { id },
      relations: ['avatar'],
    });

    return account ? instanceToPlain(account) : null;
  }
}
