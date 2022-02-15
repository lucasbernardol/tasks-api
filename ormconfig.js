require('dotenv/config');

module.exports = {
  type: process.env.DATABASE_TYPE || 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 5432,

  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,

  database: process.env.DATABASE_NAME,

  entities: ['src/core/entities/*{.js,.ts}'],

  migrationsTableName: 'migrations',
  migrations: ['src/core/database/migrations/*{.js,.ts}'],

  cli: {
    migrationsDir: 'src/core/database/migrations',
  },
};