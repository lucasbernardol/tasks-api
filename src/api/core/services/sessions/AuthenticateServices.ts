import { instanceToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { BadRequest } from 'http-errors';

import { sign, Secret, SignOptions } from 'jsonwebtoken';
import util from 'util';

import { UserRepositories } from '@repositories/UserRepositories';
import config from '@config/env';

/**
 * @type Permission
 */
export type Permissions = [string, string?];

/**
 * @interface IAuthenticateUser
 */
export interface IAuthenticateUserService {
  email: string;
  password: string;
}

/**
 * @class AuthenticateServices
 */
export class AuthenticateServices {
  private permissions: Permissions = ['user'];
  private message: string = 'Invalid email/password, please try again later!';

  public constructor(
    public repositories = getCustomRepository(UserRepositories),
    private credentials = config.jwt
  ) {}

  /** @method pushPermission */
  private pushPermission(permission: string): void {
    if (permission && this.permissions.length < 2) {
      this.permissions.push(permission);
    }
  }

  private get getPermissionsArray(): Permissions {
    return this.permissions;
  }

  /** @method execute - main method */
  async execute(options: IAuthenticateUserService) {
    const { email, password } = options;

    const account = await this.repositories.findOne({
      where: {
        email,
      },
      relations: ['avatar'],
    });

    if (!account) {
      /** @TODO Return a error message */
      throw new BadRequest(this.message);
    }

    const receivedPasswordsMatches = await compare(password, account.password);

    /** Matchs */
    if (!receivedPasswordsMatches) {
      throw new BadRequest(this.message);
    }

    /** @TODO  Sign access token */
    // prettier-ignore
    const signAccessTokenAsync = util.promisify<any, Secret, SignOptions, string>(sign);

    const { secret, expires } = this.credentials;

    if (account.is_admin) this.pushPermission('admin');

    const payload = {
      id: account.id,
      permissions: [...this.getPermissionsArray],
    };

    const token = await signAccessTokenAsync(payload, secret, {
      expiresIn: expires,
    });

    return {
      access_token: token,
      /** Normalized */
      user: instanceToPlain(account),
    };
  }
}
