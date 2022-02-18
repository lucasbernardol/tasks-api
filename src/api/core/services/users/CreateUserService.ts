import { instanceToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { Conflict } from 'http-errors';
import { hash } from 'bcryptjs';

import { UserRepositories } from '@repositories/UserRepositories';

/**
 * @interface IUser
 */
export interface IUser {
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
 * @class CreateUserService
 */
export class CreateUserService {
  private salt: number = 8;

  public constructor(
    public repositories = getCustomRepository(UserRepositories)
  ) {}

  async execute(user: IUser) {
    const { name, full_name, email, password } = user;

    const account = await this.repositories.findOne({
      where: { email },
      select: ['id'],
    });

    /** @TODO validation */
    if (account) throw new Conflict('Invalid email address!');

    /** @TODO Plain to hash */
    const plainPasswordToHash = await hash(password, this.salt);

    const userAccountInstance = this.repositories.create({
      name,
      full_name,
      email,
      password: plainPasswordToHash,
    });

    const userInstanceSaved = await this.repositories.save(userAccountInstance);

    return instanceToPlain(userInstanceSaved);
  }
}
