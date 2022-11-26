import { Request, Response } from 'express';

import { userRepository } from '../reposirories';
import { userService } from '../services';

class UserController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await userRepository.getAll();
            res.status(200)
                .json(users);
        } catch (error) {
            res.json(error);
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const { query } = req;

            const user = await userService.getById(Number(userId), query);

            res.status(200)
                .json({
                    user,
                });
        } catch (error) {
            res.json(error);
        }
    }

    async getMaxFollowing(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            const users = await userService.getMaxFollowing();

            res.json(users)
                .status(200);
        } catch (error) {
            res.json(error);
        }
    }

    async getNotFollowing(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            const users = await userService.getNotFollowing();

            res.json(users)
                .status(200);
        } catch (error) {
            res.json(error);
        }
    }
}

export const userController = new UserController();
