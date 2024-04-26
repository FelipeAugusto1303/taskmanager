import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateTaskTable1703074118276 } from 'src/migrations/1703074118276-CreateTaskTable';
import { CreateTimeSpentTable1703075709175 } from 'src/migrations/1703075709175-CreateTimeSpentTable';
import { CreateUserTable1714009826926 } from 'src/migrations/1714009826926-CreateUserTable';

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateTaskTable1703074118276,
    CreateTimeSpentTable1703075709175,
    CreateUserTable1714009826926,
  ],
});
