import { repositoryHelpers } from '../../services/db';

const tableName = 'poles';

type Pole = {
    userDefinedId: number;
    status: 'healthy' | 'unknown' | 'rotten';
    totalHeight: number;
    diameter: number;
};

export default (db) => {
    return repositoryHelpers.setupDefaultRepository<Pole>(tableName, db);
};
