import DataLoader from 'dataloader';

const tableName = 'poleGprScanTags';

type PoleGprScanTag = {
    poleGprScanId: number;
    tag: string;
};

export default (db) => {
    return {
        getAllForPoleGprScanId: new DataLoader<number, PoleGprScanTag>(
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
        create: async (data: PoleGprScanTag) => {
            await db(tableName).insert(data);
        },
    };
};
