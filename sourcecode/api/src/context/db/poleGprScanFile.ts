import { repositoryHelpers } from '../../services/db';
import DataLoader from 'dataloader';

const tableName = 'poleGprScanFiles';

type PoleGprScanFile = {
    poleGprScanId: number;
    type: 'csv' | 'sgy';
    fileName: string;
    bucketName: string;
};

export default (db) => {
    return {
        getAllForPoleGprScanId: new DataLoader<number, PoleGprScanFile>(
            async (poleGprScanIds: number[]) => {
                const tags = await db(tableName).whereIn(
                    'poleGprScanId',
                    poleGprScanIds
                );

                return poleGprScanIds.map((poleGprScanId) =>
                    tags.filter((tag) => tag.poleGprScanId === poleGprScanId)
                );
            }
        ),
        ...repositoryHelpers.setupDefaultRepository<PoleGprScanFile>(
            tableName,
            db
        ),
    };
};
