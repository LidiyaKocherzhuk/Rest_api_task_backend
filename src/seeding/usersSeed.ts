import { faker } from '@faker-js/faker';

import { mysqlDataSource } from '../config';
import { userRepository, friendRepository } from '../reposirories';
import { FriendsEntity, UserEntity } from '../entity';

export const createData = async (): Promise<void> => {
    const users = [];
    for (let i = 0; i < 200; i++) {
        const user = new UserEntity();

        user.gender = faker.name.sexType();
        user.first_name = faker.name.firstName(user.gender as 'male' || 'female');

        users.push((await userRepository.save(user)) as UserEntity);
    }
    await createSubscriptions(users);
};

const createSubscriptions = async (users: Array<UserEntity>): Promise<void> => {
    const usersIds = [];

    for (const user of users) {
        usersIds.push(user.id);
    }

    for (let i = 0; i < 150; i++) {
        const subscription = new FriendsEntity();

        const { userId, friendId } = compareId(usersIds);
        subscription.userId = userId;
        subscription.friendId = friendId;

        await friendRepository.save(subscription);
    }
};

const compareId = (usersIds: number[]): {userId: number, friendId: number} => {
    const userId = faker.helpers.arrayElement(usersIds);
    const friendId = faker.helpers.arrayElement(usersIds);

    if (friendId === userId) {
        return compareId(usersIds);
    }
    return { userId, friendId };
};

(async function (): Promise<void> {
    try {
        await mysqlDataSource.initialize();
        await createData();
        await process.exit();
    } catch (e) {
        console.log(e);
    }
}());
