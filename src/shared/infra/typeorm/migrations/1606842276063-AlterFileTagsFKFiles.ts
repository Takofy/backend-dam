import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AlterFileTagsFKFiles1606842276063
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('file_tags', 'FileTagFiles');

    await queryRunner.createForeignKey(
      'file_tags',
      new TableForeignKey({
        name: 'FileTagFiles',
        columnNames: ['tag_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tags',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('file_tags', 'FileTagFiles');

    await queryRunner.createForeignKey(
      'file_tags',
      new TableForeignKey({
        name: 'FileTagFiles',
        columnNames: ['tag_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tags',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
