import 'dotenv/config';

import { createConnection } from 'typeorm';
import { hash } from 'bcryptjs';

import { UserRepositories } from '@repositories/UserRepositories';

const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, ADMIN_FULL_NAME } =
  process.env;

/**
 * @function createUserAdminSeeder
 */
async function createUserAdminSeeder() {
  try {
    const connection = await createConnection();

    const customRepositories = connection.getCustomRepository(UserRepositories);

    /** @TODO validation  */
    const adminUserExists = await customRepositories.findOne({
      where: {
        email: ADMIN_EMAIL,
      },
    });

    if (adminUserExists) {
      throw new Error('Seeder: User already exists!');
    }

    /** Hash */
    const password = await hash(ADMIN_PASSWORD, 8);

    const adminInstance = customRepositories.create({
      name: ADMIN_NAME,
      full_name: ADMIN_FULL_NAME,
      email: ADMIN_EMAIL,
      is_admin: true,
      password,
    });

    return await customRepositories.save(adminInstance);
  } catch (error) {
    console.error(error);

    return process.exit(1);
  }
}

createUserAdminSeeder().then(({ id }) => {
  console.log(`ID: ${id}`);
});
