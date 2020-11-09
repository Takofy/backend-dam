import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterStoreInsertConfigsAndSocial1604684059346
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'stores',
      new TableColumn({
        name: 'nm_primary_color',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'stores',
      new TableColumn({
        name: 'nm_secondary_color',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'stores',
      new TableColumn({
        name: 'nm_tertiary_color',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'stores',
      new TableColumn({
        name: 'path_logo',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'stores',
      new TableColumn({
        name: 'path_backgorund',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'stores',
      new TableColumn({
        name: 'nm_facebook',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'stores',
      new TableColumn({
        name: 'nm_instagram',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'stores',
      new TableColumn({
        name: 'nm_linkedin',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'stores',
      new TableColumn({
        name: 'nm_twitter',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'stores',
      new TableColumn({
        name: 'nm_youtube',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'stores',
      new TableColumn({
        name: 'nm_tiktok',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('stores', 'nm_primary_color');
    await queryRunner.dropColumn('stores', 'nm_secondary_color');
    await queryRunner.dropColumn('stores', 'nm_tertiary_color');
    await queryRunner.dropColumn('stores', 'path_logo');
    await queryRunner.dropColumn('stores', 'path_backgorund');
    await queryRunner.dropColumn('stores', 'nm_facebook');
    await queryRunner.dropColumn('stores', 'nm_instagram');
    await queryRunner.dropColumn('stores', 'nm_linkedin');
    await queryRunner.dropColumn('stores', 'nm_twitter');
    await queryRunner.dropColumn('stores', 'nm_youtube');
    await queryRunner.dropColumn('stores', 'nm_tiktok');
  }
}
