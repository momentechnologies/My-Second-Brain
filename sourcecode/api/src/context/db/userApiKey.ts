import { repositoryHelpers } from '../../services/db';
import DataLoader from 'dataloader';
import { Knex } from 'knex';

const tableName = 'userApiKeys';

type UserApiKey = {
    key: string;
    userId: number;
    lastUsed: Date;
};

const getByUsedId = (db: Knex) =>
    new DataLoader<number, UserApiKey[]>(async (userIds: number[]) => {
        const userApiKeys = await db(tableName).whereIn('userId', userIds);

        return userIds.map((userId) =>
            userApiKeys.filter((userApiKey) => userApiKey.userId === userId)
        );
    });

const getByUsedIdAndKey = (db: Knex) => async (userId: string, key: string) =>
    db(tableName).where('userId', userId).where('key', key).first();

export default (db) => {
    return {
        ...repositoryHelpers.setupDefaultRepository<UserApiKey>(tableName, db),
        getByUsedId: getByUsedId(db),
        getByUsedIdAndKey: getByUsedIdAndKey(db),
    };
};
