import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1601488612283 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'nm_fullname',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'nr_document',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'nm_sex',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dt_born',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'path_avatar',
            type: 'varchar',
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
    await queryRunner.dropTable('users');
  }
}
