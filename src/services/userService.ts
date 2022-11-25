import { userRepository } from '../reposirories';
import { IQuery, IUserCount, IUserWithFriends } from '../intefaces';

class UserService {
    async getById(id: number, query: IQuery): Promise<IUserWithFriends | undefined> {
        const {
            order_by,
            order_type,
        } = query;

        const user = await userRepository.getById(id);
        const friendId = [] as number[];

        if (user) {
            for (const item of user.friends) {
                friendId.push(item.friendId);
            }

            const friends = await userRepository.getFriends(
                friendId,
                user.id,
                order_by || 'id',
                order_type || 'ASC',
            );

            return {
                ...user,
                friends,
            };
        }
        return undefined;
    }

    async getMaxFollowing() {
        const users = await userRepository.getFollowing() as IUserCount[];
        users.sort((a, b) => b.friendsCount - a.friendsCount);
        users.length = 5;
        return users;
    }

    async getNotFollowing() {
        const users = await userRepository.getFollowing() as IUserCount[];
        users.sort((a, b) => a.friendsCount - b.friendsCount);

        return users.filter((user) => user.friendsCount < 1);
    }
}

export const userService = new UserService();
