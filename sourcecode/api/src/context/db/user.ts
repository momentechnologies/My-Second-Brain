import DataLoader from 'dataloader';
import { repositoryHelpers } from '../../services/db';
import { Knex } from 'knex';
import { DefaultFields } from '../../services/db/repositoryHelpers';

const tableName = 'users';

type UserWithoutId = {
    firstName?: string;
    lastName?: string;
    password: string;
    email: string;
    emailConfirmed: boolean;
    stripeCustomerId?: string;
};

export interface User extends DefaultFields, UserWithoutId {}

export default (db: Knex) => {
    const getByEmail = () =>
        new DataLoader(async (emails: string[]) => {
            const users = await db(tableName).whereIn('email', emails);

            return emails.map((email) =>
                users.find((user) => user.email === email)
            );
        });

    return {
        ...repositoryHelpers.setupDefaultRepository<UserWithoutId, User>(
            tableName,
            db
        ),
        getByEmail: getByEmail(),
        getByStripeCustomerId: new DataLoader(
            async (stripeCustomerIds: string[]) => {
                const users = await db<User>(tableName).whereIn(
                    'stripeCustomerId',
                    stripeCustomerIds
                );

                return stripeCustomerIds.map((stripeCustomerId) =>
                    users.find(
                        (user) => user.stripeCustomerId === stripeCustomerId
                    )
                );
            }
        ),
    };
};
