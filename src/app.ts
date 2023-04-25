import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { config, mysqlDataSource } from './config';
import { apiRouter } from './routers';
import { ErrorHandler } from './errors';

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ origin: config.FRONTEND_HOST }));

app.use(apiRouter);

// ERROR HANDLER
app.use('*', (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json(err.message);
});

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
