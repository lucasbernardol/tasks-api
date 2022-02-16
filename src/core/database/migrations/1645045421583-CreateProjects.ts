import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProjects1645045421583 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'projects',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
          },

          {
            name: 'title',
            type: 'varchar',
            length: '80',
            isNullable: false,
          },

          {
            name: 'subtitle',
            length: '120',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'completed',
            type: 'boolean',
            isNullable: false,
            default: false,
          },

          {
            name: 'owner_id',
            type: 'uuid',
            isNullable: false,
          },

          {
            name: 'tag_id',
            type: 'uuid',
            isNullable: true,
            default: null,
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
            name: 'projects_users_foreign_key',
            columnNames: ['owner_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL',
          },

          {
            name: 'projects_tags_foreign_key',
            columnNames: ['tag_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tags',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projects');
  }
}
