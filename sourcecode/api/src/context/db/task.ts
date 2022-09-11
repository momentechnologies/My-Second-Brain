import { repositoryHelpers } from '../../services/db';
import DataLoader from 'dataloader';
import { Knex } from 'knex';

const tableName = 'tasks';

export const taskLists = ['doNext', 'delegated', 'someday', 'specificDate'];

export type TaskList =
    | 'doNext'
    | 'delegated'
    | 'someday'
    | 'specificDate'
    | null;

export type Task = {
    userId: number;
    projectId?: number;
    name: string;
    list?: TaskList;
    dueAt?: Date;
    listSpecificDateDate?: Date;
    remindMeAt?: Date;
    isDone: boolean;
    isArchived: boolean;
};

export default (db: Knex) => {
    const getAllForProjectIdWithFiltersCache = {};
    return {
        ...repositoryHelpers.setupDefaultRepository<Task>(tableName, db),
        getAllForProjectIdWithFilters: (filters: {
            onlyUnassigned: boolean | null;
            showIsDone: boolean | null;
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
                            query.where((query) =>
                                query.whereNull(`projectId`).orWhereNull('list')
                            );
                        }

                        if (!filters.showIsDone) {
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
            filters: {
                onlyUnassigned: boolean | null;
                showIsDone: boolean | null;
                list: boolean | null;
                dueBefore: Date | null;
                listSpecificDateDateBefore: Date | null;
            }
        ) => {
            const query = db(tableName)
                .select(`${tableName}.*`)
                .where('userId', userId);

            if (filters.onlyUnassigned) {
                query.where((query) =>
                    query.whereNull(`projectId`).orWhereNull('list')
                );
            }

            if (!filters.showIsDone) {
                query.where(`isDone`, false);
            }

            if (filters.list) {
                query.where(`list`, filters.list);
            }

            if (filters.dueBefore) {
                query.where(`dueAt`, '<', filters.dueBefore);
            }

            if (filters.listSpecificDateDateBefore) {
                query.where(
                    `listSpecificDateDate`,
                    '<',
                    filters.listSpecificDateDateBefore
                );
            }

            return query;
        },
    };
};
