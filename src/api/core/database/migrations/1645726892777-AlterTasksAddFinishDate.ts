import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTasksAddFinishDate1645726892777
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tasks',
      new TableColumn({
        name: 'finish_date',
        type: 'int',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tasks', 'finish_date');
  }
}
