import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterProjectsAddBanner1645729732279 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const bannerIdColumn = new TableColumn({
      name: 'banner_id',
      type: 'uuid',
      isNullable: true,
      default: null,
    });

    const bannerIdColumnForeignKey = new TableForeignKey({
      name: 'uploads_projects_foreign_key',
      columnNames: ['banner_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'uploads',
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL',
    });

    await queryRunner.addColumn('projects', bannerIdColumn);
    await queryRunner.createForeignKey('projects', bannerIdColumnForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'projects',
      'uploads_projects_foreign_key'
    );

    await queryRunner.dropColumn('projects', 'banner_id');
  }
}
