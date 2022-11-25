import { getManager } from 'typeorm';

import { FriendsEntity, IFriends } from '../../entity';

class FriendRepository {
    save(data: IFriends): Promise<FriendsEntity> {
        return getManager()
            .getRepository(FriendsEntity)
            .save(data);
    }

    getAll(): Promise<FriendsEntity[]> {
        return getManager()
            .getRepository(FriendsEntity)
            .find();
    }
}

export const subscriptionRepository = new FriendRepository();
