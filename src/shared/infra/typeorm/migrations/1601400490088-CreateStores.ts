import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateStores1601400490088 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stores',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nm_corporate_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'nm_fantasy_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'nm_initials',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nr_cnpj',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'nr_inscricao_estadual',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'nr_ccm',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'dt_born',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: false,
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
        ], // columns
      }), // new Table
    ); // createTable
  } // up

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stores');
  }
}
