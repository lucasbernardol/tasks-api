import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTags1644955697151 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tags = new Table({
      name: 'tags',
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
          length: '120',
          isUnique: true,
          isNullable: false,
        },

        {
          name: 'description',
          type: 'varchar',
          length: '255',
          isNullable: false,
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

    await queryRunner.createTable(tags);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tags');
  }
}
