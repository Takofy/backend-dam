import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterFileSizeColumn1606138522885
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('files', 'nr_size');

    await queryRunner.addColumn(
      'files',
      new TableColumn({
        name: 'nr_size',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('files', 'nr_size');

    await queryRunner.addColumn(
      'files',
      new TableColumn({
        name: 'nr_size',
        type: 'int',
        isNullable: true,
      }),
    );
  }
}
