import Router from 'express';

import { userRouter } from './userRouter';

export const apiRouter = Router();

apiRouter.use('/users', userRouter);
