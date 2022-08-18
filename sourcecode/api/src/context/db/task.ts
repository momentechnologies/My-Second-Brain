import { repositoryHelpers } from '../../services/db';
import DataLoader from 'dataloader';

const tableName = 'tasks';

type Task = {
    userId: number;
    projectId?: number;
    name: string;
    isDone: boolean;
    isArchived: boolean;
};

export default (db) => {
    return {
        ...repositoryHelpers.setupDefaultRepository<Task>(tableName, db),
        getAllForProjectId: new DataLoader(async (projectIds: string[]) => {
            const tasks = await db(tableName).whereIn('projectId', projectIds);

            return projectIds.map((projectId) =>
                tasks.filter((task) => task.projectId === projectId)
            );
        }),
        get: async (
            userId: number,
            filters: { onlyUnassigned: boolean | null }
        ) => {
            const query = db(tableName)
                .select(`${tableName}.*`)
                .where('userId', userId);

            if (filters.onlyUnassigned) {
                query.whereNull(`projectId`);
            }

            return query;
        },
    };
};
