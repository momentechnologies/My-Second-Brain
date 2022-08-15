import { Knex } from 'knex';
import DataLoader from 'dataloader';

type DefaultFields = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};

export const getAll =
    <T>(tableName: string, db: Knex) =>
    () =>
        db(tableName).select('*');

export const getById = <T>(tableName: string, db: Knex) =>
    new DataLoader<number, T>(async (userIds: number[]) => {
        const users = await db(tableName).whereIn('id', userIds);

        return userIds.map((userId) =>
            users.find((user) => user.id === userId)
        );
    });

export const create =
    <T, RT>(tableName: string, db: Knex) =>
    async (data: T) => {
        const rows = await db(tableName).insert(data).returning('*');

        return rows[0];
    };

export const updateById =
    <T, RT>(tableName: string, db: Knex) =>
    async (id: number, data: Partial<T>) => {
        await db(tableName).where('id', id).update(data);

        return getById<RT>(tableName, db).load(id);
    };

export const deleteById =
    (tableName: string, db: Knex) => async (id: number) => {
        await db(tableName).where('id', id).delete();

        return true;
    };

export const setupDefaultRepository = <T, RT = T & DefaultFields>(
    tableName: string,
    db: Knex
) => {
    return {
        getAll: getAll<RT>(tableName, db),
        getById: getById<RT>(tableName, db),
        create: create<T, RT>(tableName, db),
        updateById: updateById<T, RT>(tableName, db),
        deleteById: deleteById(tableName, db),
    };
};
