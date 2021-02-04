import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterFileColumns1611832290708
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'files',
      new TableColumn({
        name: 'path_thumbnail',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'files',
      new TableColumn({
        name: 'nm_status',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('files', 'path_thumbnail');

    await queryRunner.dropColumn('files', 'nm_status');
  }
}
