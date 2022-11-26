## Start work with the app

In the project directory, you can run:

### `npm install` or `yarn install`
At first we install npm dependencies.

In the project we use MySQL Database and the nex step we must
go into `src/config/ormconfig.ts` file and add our personal `username` and `password`

Also in MySQL Schemas we create new database, run the script - `create database grandysoft;`

```js
export const mysqlDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'LiDiYa',
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
```

`MYSQL_DATABASE_NAME = grandysoft`
If you want to use other name the database?
You must change the name in `.env` file.

### `npm run migration:run`
After that we run the script.
It will create our database and tables;

### `npm run seed`
Generate data to database;

### `npm run start`
And start the app;
