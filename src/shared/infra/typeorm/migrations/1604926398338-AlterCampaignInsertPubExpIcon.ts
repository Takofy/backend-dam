import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterCampaignInsertPubExpIcon1604926398338
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'campaigns',
      new TableColumn({
        name: 'path_icon',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'campaigns',
      new TableColumn({
        name: 'dt_publication',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'campaigns',
      new TableColumn({
        name: 'dt_expiration',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('campaigns', 'path_icon');
    await queryRunner.dropColumn('campaigns', 'dt_publication');
    await queryRunner.dropColumn('campaigns', 'dt_expiration');
  }
}
