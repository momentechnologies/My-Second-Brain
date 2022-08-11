import db from './db';
import { Knex } from 'knex';

const asyncTransaction = async (
    clb: (transaction: Knex.Transaction) => Promise<any>
) => {
    let transaction = await db.transaction();
    try {
        await clb(transaction);
        await transaction.commit();
    } catch (e) {
        await transaction.rollback();
        throw e;
    }
};

export default asyncTransaction;
