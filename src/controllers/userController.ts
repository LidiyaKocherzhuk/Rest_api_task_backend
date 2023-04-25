import { NextFunction, Request, Response } from 'express';

import { userService } from '../services';

class UserController {
    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await userService.getAll();
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

            res.status(200)
                .json({
                    user,
                });
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
        } catch (error) {
            next(error);
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
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();
