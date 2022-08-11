import queryBuilder, { repositoryHelpers } from '../../services/db';

const tableName = 'poleGprScans';

type PoleGprScan = {
    poleId: number;
    heightFromGround: number;
    withPec: boolean;
    polarizationDirection: string;
    comment?: string;
    scannedAt: Date;
};

export default (db) => {
    return {
        ...repositoryHelpers.setupDefaultRepository<PoleGprScan>(tableName, db),
        get: async (filters: {
            tags?: string[];
            userDefinedPoleId: string;
        }) => {
            const query = db(tableName).select(`${tableName}.*`);

            if (filters.tags && filters.tags.length !== 0) {
                const scansIdWithTagsQuery = queryBuilder(
                    'poleGprScanTags as pgst'
                )
                    .select('poleGprScanId')
                    .whereIn('tag', filters.tags);

                query.whereIn(`${tableName}.id`, scansIdWithTagsQuery);
            }

            if (filters.userDefinedPoleId) {
                query
                    .join('poles as p', 'p.id', `${tableName}.poleId`)
                    .where('p.userDefinedId', filters.userDefinedPoleId);
            }

            return query;
        },
    };
};
