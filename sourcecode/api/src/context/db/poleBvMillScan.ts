import { repositoryHelpers } from '../../services/db';

const tableName = 'poleBvMillScans';

type PoleBvMillScan = {
    poleId: number;
    version: string;
    heightFromGround: number;
    circumference: number;
    comment?: string;
};

export default (db) => {
    return repositoryHelpers.setupDefaultRepository<PoleBvMillScan>(
        tableName,
        db
    );
};
