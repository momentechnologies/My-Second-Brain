import { repositoryHelpers } from '../../services/db';
import DataLoader from 'dataloader';

const tableName = 'nodes';

type Node = {
    userId: number;
    parentNodeId?: number;
    name: string;
    content: string;
    isArchived: boolean;
};

export default (db) => {
    const getAllForParentNodeIdCache = {};
    return {
        ...repositoryHelpers.setupDefaultRepository<Node>(tableName, db),
        getAllForParentNodeId: (userId: number) => {
            if (!getAllForParentNodeIdCache[String(userId)]) {
                getAllForParentNodeIdCache[String(userId)] = new DataLoader(
                    async (parentNodeIds: number[]) => {
                        const nodes = await db(tableName)
                            .where('userId', userId)
                            .whereIn('parentNodeId', parentNodeIds);

                        return parentNodeIds.map((parentNodeId) =>
                            nodes.filter(
                                (node) => node.parentNodeId === parentNodeId
                            )
                        );
                    }
                );
            }

            return getAllForParentNodeIdCache[String(userId)];
        },
        get: async (
            userId: number,
            filters: { onlyUnassigned: boolean | null }
        ) => {
            const query = db(tableName)
                .select(`${tableName}.*`)
                .where('userId', userId);

            if (filters.onlyUnassigned) {
                query.whereNull(`parentNodeId`);
            }

            return query;
        },
        getRootNodes: async (userId: number) => {
            return db(tableName)
                .select(`${tableName}.*`)
                .where('userId', userId);
        },
    };
};
