import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateTaskTable1703074118276 } from 'src/migrations/1703074118276-CreateTaskTable';
import { CreateTimeSpentTable1703075709175 } from 'src/migrations/1703075709175-CreateTimeSpentTable';

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [CreateTaskTable1703074118276, CreateTimeSpentTable1703075709175],
});
