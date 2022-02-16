import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterUsersAddAvatarColumn1645040106136
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar_id',
        type: 'uuid',
        isNullable: true,
        default: null,
      })
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'users_avatar_foreign_key',
        columnNames: ['avatar_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'uploads',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'users_avatar_foreign_key');

    await queryRunner.dropColumn('users', 'avatar_id');
  }
}
