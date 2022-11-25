import { NextFunction, Request, Response } from 'express';

import { userRepository } from '../reposirories';
import { userService } from '../services';

class UserController {
    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await userRepository.getAll();
            res.status(200)
                .json(users);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            const { query } = req;

            const user = await userService.getById(Number(userId), query);
            if (!user) {
                next(new Error('User does not exists!'));
                return;
            }
            res.status(200)
                .json(user);
        } catch (error) {
            next(error);
        }
    }

    async getMaxFollowing(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const users = await userService.getMaxFollowing();

            res.json(users)
                .status(200);
        } catch (e) {
            next(e);
        }
    }

    async getNotFollowing(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const users = await userService.getNotFollowing();

            res.json(users)
                .status(200);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
