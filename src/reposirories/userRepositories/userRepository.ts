import { getManager } from 'typeorm';

import UserEntity, { IUser } from '../../entity/userEntity';
import { IUserCount } from '../../intefaces';

class UserRepository {
    save(data: IUser): Promise<UserEntity> {
        return getManager()
            .getRepository(UserEntity)
            .save(data);
    }

    getAll(): Promise<UserEntity[]> {
        return getManager()
            .getRepository(UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.friends', 'friends')
            .getMany();
    }

    getById(id: number): Promise<UserEntity | undefined> {
        return getManager()
            .getRepository(UserEntity)
            .findOne({ id }, { relations: ['friends'] });
    }

    getFriends(
        ids: number[],
        userId: number,
        order_by: string,
        order_type: 'ASC' | 'DESC',
    ): Promise<UserEntity[]> {
        return getManager()
            .getRepository(UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.friends', 'friends')
            .where('user.id IN (:...ids)', { ids })
            .andWhere('friends.friendId = :userId', { userId })
            .orderBy(`user.${order_by}`, order_type)
            .getMany();
    }

    async getFollowing(): Promise<UserEntity[] | IUserCount[]> {
        return getManager()
            .getRepository(UserEntity)
            .createQueryBuilder('user')
            .loadRelationCountAndMap(
                'user.friendsCount',
                'user.friends',
            )
            .getMany();
    }
}

export const userRepository = new UserRepository();
