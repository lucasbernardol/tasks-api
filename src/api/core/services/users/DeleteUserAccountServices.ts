import { getCustomRepository } from 'typeorm';
import { BadRequest } from 'http-errors';

import { UserRepositories } from '@repositories/UserRepositories';
import { compare } from 'bcryptjs';

export interface IDeleteUserAccount {
  id: string;
  password: string;
}

/**
 * @class DeleteUserAccountServices
 */
export class DeleteUserAccountServices {
  public constructor(
    public repositories = getCustomRepository(UserRepositories)
  ) {}

  /** @method execute - main method */
  async execute(options: IDeleteUserAccount) {
    const { id, password } = options;

    const account = await this.repositories.findOne({ id });

    if (!account) {
      /** Return a error message */
      throw new BadRequest('Account does not exists!');
    }

    const receivedPasswordsMatches = await compare(password, account.password);

    if (!receivedPasswordsMatches) {
      throw new BadRequest('Invalid passwords!');
    }

    const deleteResult = await this.repositories.delete(id);

    const deleted = Boolean(deleteResult.affected);

    return {
      deleted,
    };
  }
}
