import { repositoryHelpers } from '../../services/db';
import DataLoader from 'dataloader';

const tableName = 'notes';

type Note = {
    userId: number;
    parentNodeId?: number;
    name: string;
    content: string;
    isArchived: boolean;
};

export default (db) => {
    const getAllForParentNoteIdCache: {
        [key: string]: DataLoader<number, Note[]>;
    } = {};

    return {
        ...repositoryHelpers.setupDefaultRepository<Note>(tableName, db),
        getAllForParentNodeId: (userId: number) => {
            if (!getAllForParentNoteIdCache[String(userId)]) {
                getAllForParentNoteIdCache[String(userId)] = new DataLoader(
                    async (parentNodeIds: number[]) => {
                        const notes = await db(tableName)
                            .where('userId', userId)
                            .whereIn('parentNodeId', parentNodeIds);

                        return parentNodeIds.map((parentNodeId) =>
                            notes.filter(
                                (node) => node.parentNodeId === parentNodeId
                            )
                        );
                    }
                );
            }

            return getAllForParentNoteIdCache[String(userId)];
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
        getRootNotes: async (userId: number) => {
            return db(tableName)
                .select(`${tableName}.*`)
                .where('userId', userId);
        },
    };
};
