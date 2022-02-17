import 'reflect-metadata';
import { createConnection } from 'typeorm';

/**
 * @class Database
 */
export class Database {
  private static instance: Database;

  /**
   * @private constructor
   */
  private constructor() {}

  static get getInstance(): Database {
    if (!this.instance) {
      this.instance = new Database();
    }

    return this.instance;
  }

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
