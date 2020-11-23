import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterFilesInsertCols1605726418795
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'files',
      new TableColumn({
        name: 'nr_code',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'files',
      new TableColumn({
        name: 'nr_width',
        type: 'smallint',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'files',
      new TableColumn({
        name: 'nr_height',
        type: 'smallint',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'files',
      new TableColumn({
        name: 'nr_size',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'files',
      new TableColumn({
        name: 'dt_publication',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'files',
      new TableColumn({
        name: 'dt_expiration',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('files', 'nr_code');
    await queryRunner.dropColumn('files', 'nr_width');
    await queryRunner.dropColumn('files', 'nr_height');
    await queryRunner.dropColumn('files', 'nr_size');
    await queryRunner.dropColumn('files', 'dt_publication');
    await queryRunner.dropColumn('files', 'dt_expiration');
  }
}
