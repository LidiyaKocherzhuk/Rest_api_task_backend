import express from 'express';

import { config, mysqlDataSource } from './config';
import { apiRouter } from './routers';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(apiRouter);

const { PORT } = config;
app.listen(PORT, async () => {
    console.log(`Server has started on port ${PORT}!`);

    try {
        const connection = await mysqlDataSource.initialize();
        if (connection) {
            console.log('database connected');
        }
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
});
