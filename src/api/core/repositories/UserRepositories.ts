import { EntityRepository, Repository } from 'typeorm';

import { User } from '@entities/User';

@EntityRepository(User)
class UserRepositories extends Repository<User> {
  public async findAndIgnoreFields(id: string) {
    const account = await this.createQueryBuilder('User')
      .where('User.id = :id', { id })
      .select([
        'User.id',
        'User.name',
        'User.full_name',
        'User.avatar_id',
        'User.created_at',
        'User.updated_at',
      ])
      .leftJoinAndSelect('User.avatar', 'avatar')
      .getOne();

    return account;
  }
}

export { UserRepositories };
