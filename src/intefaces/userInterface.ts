import { IUserExtend } from '../entity';

export interface IUserWithFriends extends IUserExtend{
    friends: IUserExtend[];
}

export interface IUserCount extends IUserExtend{
    friendsCount: number;
}
