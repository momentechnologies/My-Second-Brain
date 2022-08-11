import { repositoryHelpers } from '../../services/db';
import DataLoader from 'dataloader';

const tableName = 'poleBvMillScanFiles';

type PoleBvMillScanFile = {
    poleBvMillScanId: number;
    type: 'picture' | 'result' | 'preview' | 'backup';
    fileName: string;
    bucketName: string;
};

export default (db) => {
    return {
        getAllForPoleBvMillScanId: new DataLoader<number, PoleBvMillScanFile>(
            async (poleBvMillScanIds: number[]) => {
                const tags = await db(tableName).whereIn(
                    'poleBvMillScanId',
                    poleBvMillScanIds
                );

                return poleBvMillScanIds.map((poleBvMillScanId) =>
                    tags.filter(
                        (tag) => tag.poleBvMillScanId === poleBvMillScanId
                    )
                );
            }
        ),
        ...repositoryHelpers.setupDefaultRepository<PoleBvMillScanFile>(
            tableName,
            db
        ),
    };
};
