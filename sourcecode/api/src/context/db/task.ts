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
    const getAllForProjectId = () =>
        new DataLoader(async (projectIds: string[]) => {
            const tasks = await db(tableName).whereIn('projectId', projectIds);

            return projectIds.map((projectId) =>
                tasks.filter((task) => task.projectId === projectId)
            );
        });
    return {
        ...repositoryHelpers.setupDefaultRepository<Task>(tableName, db),
        getAllForProjectId: getAllForProjectId(),
    };
};
