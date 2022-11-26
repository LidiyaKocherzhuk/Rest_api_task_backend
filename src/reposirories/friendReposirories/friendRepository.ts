import { mysqlDataSource } from '../../config';
import { FriendsEntity, IFriends } from '../../entity';

class FriendRepository {
    save(data: IFriends): Promise<FriendsEntity> {
        return mysqlDataSource
            .getRepository(FriendsEntity)
            .save(data);
    }
}

export const friendRepository = new FriendRepository();
