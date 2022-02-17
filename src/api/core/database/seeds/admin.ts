import { createConnection } from 'typeorm';
import { hash } from 'bcryptjs';

import { UserRepositories } from '@repositories/UserRepositories';

/**
 * @function createUserAdminSeeder
 */
async function seedFunctionToCreateAdmin() {
  try {
    const connection = await createConnection();

    const customRepositories = connection.getCustomRepository(UserRepositories);

    /** @TODO validation  */
    const adminUserExists = await customRepositories.findOne({
      where: {
        email: 'tasks@admin.com', // initial value
      },
    });

    if (adminUserExists) {
      throw new Error('Seeder: User already exists!');
    }

    /** Hash */
    const password = await hash('admin', 8);

    const adminInstance = customRepositories.create({
      name: 'admin',
      full_name: 'admin',
      email: 'tasks@admin.com',
      is_admin: true,
      password,
    });

    return await customRepositories.save(adminInstance);
  } catch (error) {
    console.error(error);

    return process.exit(1);
  }
}

seedFunctionToCreateAdmin().then(({ id }) => console.log(`ID: ${id}`));
