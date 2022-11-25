import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { config } from '../config';
import CommonEntity, { ICommon } from './commonEntity';
import UserEntity from './userEntity';

export interface IFriendsExtend extends ICommon {
    userId: number;
    friendId: number;
}

export interface IFriends {
    userId: number;
    friendId: number;
}

@Entity('friends', { database: config.MYSQL_DATABASE_NAME })
export class FriendsEntity extends CommonEntity implements IFriendsExtend {
    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        friendId: number;

    @ManyToOne(
        () => UserEntity,
        (user) => user.friends,
        { onDelete: 'CASCADE' },
    )
    @JoinColumn({ name: 'userId' })
        user: UserEntity;

    @JoinColumn({ name: 'friendId' })
        friendsUser: UserEntity;
}
