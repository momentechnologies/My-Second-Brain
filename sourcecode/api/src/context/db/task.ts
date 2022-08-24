import { repositoryHelpers } from '../../services/db';
import DataLoader from 'dataloader';

const tableName = 'tasks';

export type Task = {
    userId: number;
    projectId?: number;
    name: string;
    isDone: boolean;
    isArchived: boolean;
};

export default (db) => {
    const getAllForProjectIdWithFiltersCache = {};
    return {
        ...repositoryHelpers.setupDefaultRepository<Task>(tableName, db),
        getAllForProjectIdWithFilters: (filters: {
            onlyUnassigned: boolean | null;
            onlyIsNotDone: boolean | null;
        }) => {
            const key = JSON.stringify(filters);

            if (!getAllForProjectIdWithFiltersCache[key]) {
                getAllForProjectIdWithFiltersCache[key] = new DataLoader(
                    async (projectIds: string[]) => {
                        const query = db(tableName).whereIn(
                            'projectId',
                            projectIds
                        );

                        if (filters.onlyUnassigned) {
                            query.whereNull(`projectId`);
                        }

                        if (filters.onlyIsNotDone) {
                            query.where(`isDone`, false);
                        }

                        const tasks = await query;

                        return projectIds.map((projectId) =>
                            tasks.filter((task) => task.projectId === projectId)
                        );
                    }
                );
            }

            return getAllForProjectIdWithFiltersCache[key];
        },
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
