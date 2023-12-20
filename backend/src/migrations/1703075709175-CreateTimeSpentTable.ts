import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateTimeSpentTable1703075709175 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'timeSpent',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'comment',
            type: 'varchar',
          },
          {
            name: 'timeSpent',
            type: 'int',
          },
          {
            name: 'spentAt',
            type: 'date',
          },
        ],
      }),
    );
    await queryRunner.addColumn(
      'timeSpent',
      new TableColumn({
        name: 'taskId',
        type: 'uuid',
      }),
    );
    await queryRunner.createForeignKey(
      'timeSpent',
      new TableForeignKey({
        name: 'timeSpent_task',
        columnNames: ['taskId'],
        referencedTableName: 'task',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('timeSpent');
  }
}
