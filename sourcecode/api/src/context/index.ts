import db from './db';
import { Response } from 'express';
import { CustomRequest } from '../types/CustomRequest';
import { AsyncReturnType } from '../types/AsyncReturnType';
import { Knex } from 'knex';
import Transaction = Knex.Transaction;

export const buildRawContext = () => {
    const defaultDb = db();

    return {
        db: (transaction?: Transaction) => {
            if (transaction) {
                return db(transaction);
            }

            return defaultDb;
        },
    };
};

const getContext = async (req: CustomRequest, res: Response) => {
    const rawContext = buildRawContext();

    return {
        user: req.user,
        res,
        req,
        ...rawContext,
    };
};

export type Context = AsyncReturnType<typeof getContext>;

export default getContext;
