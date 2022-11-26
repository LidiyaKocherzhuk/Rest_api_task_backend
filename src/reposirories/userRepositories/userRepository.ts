import { mysqlDataSource } from '../../config';
import { UserEntity, IUser } from '../../entity';
import { IUserCount, IUserWithFriends } from '../../intefaces';

class UserRepository {
    save(data: IUser): Promise<UserEntity> {
        return mysqlDataSource.getRepository(UserEntity).save(data);
    }

    getAll(): Promise<UserEntity[]> {
        return mysqlDataSource
            .getRepository(UserEntity)
            .createQueryBuilder(`user`)
            .leftJoinAndSelect('user.friends', 'friends')
            .getMany();
    }

    getById(id: number): Promise<UserEntity | null> {
        return mysqlDataSource
            .getRepository(UserEntity)
            .findOne({
                where: {
                    id,
                },
                relations: {
                    friends: true,
                },
            });
    }

    getAllFriends(
        ids: number[],
    ): Promise<UserEntity[] | IUserWithFriends[]> {
        return mysqlDataSource
            .getRepository(UserEntity)
            .createQueryBuilder(`user`)
            .where(`user.id IN(:...ids)`, { ids })
            .getMany();
    }

    getFriends(
        ids: number[],
        userId: number,
        order_by: string,
        order_type: `ASC` | `DESC`,
    ): Promise<UserEntity[] | IUserWithFriends[]> {
        return mysqlDataSource
            .getRepository(UserEntity)
            .createQueryBuilder(`user`)
            .where(`user.id IN(:...ids)`, { ids })
            .leftJoinAndSelect('user.friends', `friends`)
            .andWhere('friends.friendId = :userId', { userId })
            .orderBy(`user.${order_by}`, order_type)
            .getMany();
    }

    async getFollowing(): Promise<UserEntity[] | IUserCount[]> {
        return mysqlDataSource
            .getRepository(UserEntity)
            .createQueryBuilder(`user`)
            .loadRelationCountAndMap(
                'user.friendsCount',
                'user.friends',
            )
            .getMany();
    }
}

export const userRepository = new UserRepository();
