import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateFiles1602613754976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'files',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nm_title',
            type: 'varchar',
          },
          {
            name: 'nm_description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nm_original_file_name',
            type: 'varchar',
          },
          {
            name: 'nm_type',
            type: 'varchar',
          },
          {
            name: 'nm_subtype',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nm_mime',
            type: 'varchar',
          },
          {
            name: 'nm_s3_version',
            type: 'varchar',
          },
          {
            name: 'nm_s3_name',
            type: 'varchar',
          },
          {
            name: 'nm_url',
            type: 'varchar',
          },
          {
            name: 'campaign_owner_id',
            type: 'uuid',
            isNullable: true,
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
      'files',
      new TableForeignKey({
        name: 'UserOwnerFile',
        columnNames: ['user_owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'files',
      new TableForeignKey({
        name: 'StoreOwnerFile',
        columnNames: ['store_owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'stores',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'files',
      new TableForeignKey({
        name: 'CampaignOwnerFile',
        columnNames: ['campaign_owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'campaigns',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('files', 'CampaignOwnerFile');
    await queryRunner.dropForeignKey('files', 'StoreOwnerCampaign');
    await queryRunner.dropForeignKey('files', 'UserOwnerCampaign');

    await queryRunner.dropTable('files');
  }
}
