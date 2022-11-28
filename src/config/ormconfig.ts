import { DataSource } from 'typeorm';
import { config } from './config';

export const mysqlDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: '*****',
    password: '*****',
    database: config.MYSQL_DATABASE_NAME,
    synchronize: false,
    logging: false,
    entities: [
        'src/entity/**/*.ts',
    ],
    migrations: [
        'src/migrations/**/*.ts',
    ],
    subscribers: [
    ],
});
