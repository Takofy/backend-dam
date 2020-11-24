import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTags1606160199642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tags',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nm_tag',
            type: 'varchar',
          },
          {
            name: 'is_fixed',
            type: 'boolean',
            default: false,
          },
          {
            name: 'store_owner_id',
            type: 'uuid',
            isNullable: false,
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
      'tags',
      new TableForeignKey({
        name: 'StoreTag',
        columnNames: ['store_owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'stores',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tags', 'StoreTag');
    await queryRunner.dropTable('tags');
  }
}
