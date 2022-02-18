import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTasks1645191150689 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
          },

          {
            name: 'name',
            length: '120',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'details',
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
            name: 'project_id',
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
            name: 'users_tasks_foreign_key',
            columnNames: ['owner_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL',
          },

          {
            name: 'projects_tasks_foreign_key',
            columnNames: ['project_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'projects',
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
