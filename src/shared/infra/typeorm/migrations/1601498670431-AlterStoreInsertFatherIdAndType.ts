import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterStoreInsertFatherIdAndType1601498670431
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'stores',
      new TableColumn({
        name: 'id_company_owner',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'stores',
      new TableColumn({
        name: 'type_company',
        type: 'varchar',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'stores',
      new TableForeignKey({
        name: 'StoreCompanyOwnerId',
        columnNames: ['id_company_owner'],
        referencedColumnNames: ['id'],
        referencedTableName: 'stores',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('stores', 'StoreCompanyOwnerId');

    await queryRunner.dropColumn('stores', 'type_company');

    await queryRunner.dropColumn('stores', 'id_company_owner');
  }
}
