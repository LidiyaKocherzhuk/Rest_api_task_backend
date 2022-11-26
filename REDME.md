## Start work with the app

In the project directory, you can run:

### `npm install` or `yarn install`
At first we install npm dependencies

---

In the project we use MySQL Database and the nex step we must
go into ormconfig.json ang add our personal `username` and `password`

```js
{
    "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "your MySQL username!!!",
        "password": "your MySQL password!!!",
        "database": "grandysoft",
        "synchronize": false,
        "logging": false,
        "entities": [
        "src/entity/**/*.ts"
    ],
        "migrations": [
        "src/migrations/**/*.ts"
    ],
        "subscribers": [
    ],
        "cli": {
        "migrationsDir": "src/migrations"
    }
}
```
---

### `npm run migration:run`
After that we run the script.
It will create our database and tables;
---

### `npm run seed`
Generate data to database;

---

### `npm run start`
And start the app;
