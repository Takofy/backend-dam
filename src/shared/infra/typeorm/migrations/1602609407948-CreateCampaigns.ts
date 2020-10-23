import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateCampaigns1602609407948
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'campaigns',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nm_campaign_name',
            type: 'varchar',
          },
          {
            name: 'nm_campaign_description',
            type: 'varchar',
          },
          {
            name: 'user_owner_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'store_owner_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'campaigns',
      new TableForeignKey({
        name: 'UserOwnerCampaign',
        columnNames: ['user_owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'campaigns',
      new TableForeignKey({
        name: 'StoreOwnerCampaign',
        columnNames: ['store_owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'stores',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('campaigns', 'UserOwnerCampaign');
    await queryRunner.dropForeignKey('campaigns', 'StoreOwnerCampaign');

    await queryRunner.dropTable('campaigns');
  }
}
