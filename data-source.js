import { DataSource } from 'typeorm';

const dbConfig = {
  migrations: ['migrations/*.js'],
  synchronize: false,
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;

  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;

  case 'production':
    // Define your production configuration here
    break;

  default:
    throw new Error('unknown environment');
}

export const AppDataSource = new DataSource(dbConfig);
