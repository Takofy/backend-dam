import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AlterFileTagsFKs1606796703417
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('file_tags', 'FileTagTags');

    await queryRunner.createForeignKey(
      'file_tags',
      new TableForeignKey({
        name: 'FileTagTags',
        columnNames: ['tag_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tags',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('file_tags', 'FileTagTags');

    await queryRunner.createForeignKey(
      'file_tags',
      new TableForeignKey({
        name: 'FileTagTags',
        columnNames: ['tag_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tags',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
