import { IUserExtend } from '../entity';

export interface IUserWithFriends extends IUserExtend{
    friends?: IUserWithFriends[];
}

export interface IUserCount extends IUserExtend{
    friendsCount: number;
}
