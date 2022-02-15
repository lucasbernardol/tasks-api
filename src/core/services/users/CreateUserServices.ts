import { getCustomRepository } from 'typeorm';
import { Conflict } from 'http-errors';
import { hash } from 'bcryptjs';

import { UserRepositories } from '@repositories/UserRepositories';

interface IUser {
  id?: string;
  name: string;
  full_name: string;
  email: string;
  password: string;
  is_admin?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * @class CreateUserServices
 */
export class CreateUserServices {
  private salt: number = 8;

  public constructor(
    public repositories = getCustomRepository(UserRepositories)
  ) {}

  async execute(user: IUser) {
    const { name, full_name, email, password } = user;

    /** @TODO validation */
    const userAccountExistis = await this.repositories.findOne({
      where: {
        email,
      },
    });

    if (userAccountExistis) {
      throw new Conflict('Invalid email address!');
    }

    /** Hash */
    const plainPasswordToHash = await hash(password, this.salt);

    const userAccountInstance = this.repositories.create({
      name,
      full_name,
      email,
      password: plainPasswordToHash,
    });

    return await this.repositories.save(userAccountInstance);
  }
}
