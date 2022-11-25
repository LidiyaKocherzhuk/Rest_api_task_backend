import Router from 'express';

import { userController } from '../controllers';

export const userRouter = Router();

userRouter.get('', userController.getAll);
userRouter.get('/:userId/friends', userController.getById);
userRouter.get('/max-following', userController.getMaxFollowing);
userRouter.get('/not-following', userController.getNotFollowing);
