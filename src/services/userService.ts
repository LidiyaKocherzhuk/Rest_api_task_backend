import { userRepository } from '../reposirories';
import { IQuery, IUserCount, IUserWithFriends } from '../intefaces';
import { ErrorHandler } from '../errors';
import { IUser } from '../entity';

class UserService {
    async getAll(): Promise<IUser[]> {
        try {
            const users = await userRepository.getAll();
            const usersWithFriends = [] as IUserWithFriends[];

            for (const user of users) {
                const friendId = [] as number[];
                let friends = [] as IUserWithFriends[];

                for (const item of user.friends) {
                    friendId.push(item.friendId);
                }

                if (friendId.length) {
                    friends = await userRepository.getAllFriends(
                        friendId,
                    ) as IUserWithFriends[];
                }

                friends.forEach((friend: IUserWithFriends) => {
                    delete friend.friends;
                });

                usersWithFriends.push({
                    ...user,
                    friends,
                });
            }

            return usersWithFriends;
        } catch (error) {
            throw new ErrorHandler(error.message, error.status);
        }
    }

    async getById(id: number, query: IQuery): Promise<IUserWithFriends | undefined> {
        try {
            const {
                order_by = `id`,
                order_type = `ASC`,
            } = query;

            const user = await userRepository.getById(id);
            const friendId = [] as number[];
            let friends = [] as IUserWithFriends[];

            if (user) {
                for (const item of user.friends) {
                    friendId.push(item.friendId);
                }

                if (friendId.length) {
                    friends = await userRepository.getFriends(
                        friendId,
                        user.id,
                        order_by,
                        order_type,
                    ) as IUserWithFriends[];
                }

                friends.forEach((friend: IUserWithFriends) => {
                    delete friend.friends;
                });

                if (friends.length) {
                    return {
                        ...user,
                        friends,
                    };
                }
                return undefined;
            }
            return undefined;
        } catch (error) {
            throw new ErrorHandler(error.message, error.status);
        }
    }

    async getMaxFollowing(): Promise<IUserCount[]> {
        const users = await userRepository.getFollowing() as IUserCount[];
        users.sort((a, b) => b.friendsCount - a.friendsCount);
        users.length = 5;
        return users;
    }

    async getNotFollowing(): Promise<IUserCount[]> {
        try {
            const users = await userRepository.getFollowing() as IUserCount[];
            return users.filter((user) => user.friendsCount < 1);
        } catch (error) {
            throw new ErrorHandler(error.message, error.status);
        }
    }
}

export const userService = new UserService();
