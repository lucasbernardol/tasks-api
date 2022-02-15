import { EntityRepository, Repository } from 'typeorm';

import { User } from '@entities/User';

/**
 * @class UserRepository
 */
@EntityRepository(User)
export class UserRepositories extends Repository<User> {}
