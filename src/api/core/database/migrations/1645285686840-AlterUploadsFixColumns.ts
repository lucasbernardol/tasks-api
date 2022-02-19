import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUploadsFixColumns1645285686840 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('uploads', [
      new TableColumn({
        name: 'public_id',
        type: 'varchar',
        isNullable: true,
      }),

      new TableColumn({
        name: 'width',
        type: 'int',
        isNullable: true,
      }),

      new TableColumn({
        name: 'height',
        type: 'int',
        isNullable: true,
      }),

      new TableColumn({
        name: 'resource_type',
        type: 'varchar',
        isNullable: true,
      }),

      new TableColumn({
        name: 'secure_url',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('uploads', [
      'public_id',
      'width',
      'height',
      'resource_type',
      'secure_url',
    ]);
  }
}
