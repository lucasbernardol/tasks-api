import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { BadRequest } from 'http-errors';

import { UserRepositories } from '@repositories/UserRepositories';

/**
 * @class IDeleteUserAccount
 */
export interface IDeleteUserAccount {
  id: string;
  password: string;
}

/**
 * @class DeleteUserAccountService
 */
export class DeleteUserAccountService {
  public constructor(
    public repositories = getCustomRepository(UserRepositories)
  ) {}

  /** @method execute - main method */
  async execute(options: IDeleteUserAccount): Promise<{ deleted: boolean }> {
    const { id, password } = options;

    const account = await this.repositories.findOne({ id });

    /** @TODO Return a error message */
    if (!account) {
      throw new BadRequest('Account does not exists!');
    }

    const receivedPasswordsMatches = await compare(password, account.password);

    if (!receivedPasswordsMatches) {
      throw new BadRequest('Invalid passwords!');
    }

    const deletion = await this.repositories.delete(id);

    return {
      deleted: Boolean(deletion.affected),
    };
  }
}
