import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTagsAddColor1645304764167 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tags',
      new TableColumn({
        name: 'color',
        type: 'varchar',
        length: '7', // @example: #6159c1
        isNullable: true,
        default: null,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tags', 'color');
  }
}
