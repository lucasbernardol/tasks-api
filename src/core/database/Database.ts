import 'reflect-metadata';

import { createConnection } from 'typeorm';

/**
 * @class Database
 */
export class Database {
  /** @private constructor */
  private constructor() {}

  static async connect() {
    try {
      const connection = await createConnection();

      const { type } = connection.options;

      console.log(`\nDATABASE: ${type.toUpperCase()}`);
    } catch (error) {
      console.error(error);

      return process.exit(1);
    }
  }
}
