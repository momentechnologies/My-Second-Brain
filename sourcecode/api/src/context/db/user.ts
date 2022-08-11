import DataLoader from 'dataloader';
import { repositoryHelpers } from '../../services/db';

const tableName = 'users';

type User = {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
};

export default (db) => {
    const getByEmail = () =>
        new DataLoader(async (emails: string[]) => {
            const users = await db(tableName).whereIn('email', emails);

            return emails.map((email) =>
                users.find((user) => user.email === email)
            );
        });

    return {
        ...repositoryHelpers.setupDefaultRepository<User>(tableName, db),
        getByEmail: getByEmail(),
    };
};
