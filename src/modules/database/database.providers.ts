import { DataSource } from 'typeorm';
import { User } from '../Users/entities/User';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3307,
        username: 'root',
        password: 'my-secret-pw',
        database: 'CRUD',
        entities: [User],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];