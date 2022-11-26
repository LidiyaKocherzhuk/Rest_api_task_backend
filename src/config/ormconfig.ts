import { DataSource } from 'typeorm';

export const mysqlDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: '*****',
    password: '*****',
    database: 'grandysoft',
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
