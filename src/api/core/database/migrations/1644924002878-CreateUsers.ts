import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1644924002878 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isNullable: false,
        },

        {
          name: 'name',
          type: 'varchar',
          length: '80',
          isNullable: false,
        },

        {
          name: 'full_name',
          length: '200',
          type: 'varchar',
          isNullable: false,
        },

        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
          isNullable: false,
        },

        {
          name: 'password',
          type: 'varchar',
          isNullable: false,
        },

        {
          name: 'is_admin',
          type: 'boolean',
          isNullable: false,
          default: false,
        },

        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },

        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    });

    await queryRunner.createTable(users);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
