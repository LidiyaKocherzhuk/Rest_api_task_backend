import {
    Entity,
    Column,
    OneToMany,
} from 'typeorm';

import { config } from '../config';
import CommonEntity, { ICommon } from './commonEntity';
import { FriendsEntity } from './friendsEntity';

export interface IUserExtend extends ICommon {
    first_name: string;
    gender: string;
}

export interface IUser {
    first_name: string;
    gender: string;
}

@Entity('users', { database: config.MYSQL_DATABASE_NAME })
export default class UserEntity extends CommonEntity implements IUserExtend {
    @Column({
        type: 'varchar',
        width: 50,
        nullable: false,
    })
        first_name: string;

    @Column({
        type: 'varchar',
        width: 10,
        nullable: false,
    })
        gender: string;

    @OneToMany(() => FriendsEntity, (friends) => friends.user)
        friends: FriendsEntity[];
}
