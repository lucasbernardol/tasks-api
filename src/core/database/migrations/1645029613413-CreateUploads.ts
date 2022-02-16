import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUploads1645029613413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'uploads',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
          },

          {
            name: 'filename',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'originalname',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'bytes',
            type: 'int',
            isNullable: false,
          },

          {
            name: 'mimetype',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'owner_id',
            type: 'uuid',
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

        foreignKeys: [
          {
            name: 'uploads_users_foreign_key',
            columnNames: ['owner_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('uploads');
  }
}
