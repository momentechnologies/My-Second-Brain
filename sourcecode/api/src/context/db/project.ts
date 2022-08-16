import { repositoryHelpers } from '../../services/db';
import DataLoader from 'dataloader';

const tableName = 'projects';

export const projectStatuses = ['todo', 'doing', 'done', 'onHold', 'ongoing'];

type Project = {
    userId: number;
    name: string;
    status: 'todo' | 'doing' | 'done' | 'onHold' | 'ongoing';
    isArchived: boolean;
    deadline: Date;
};

export default (db) => {
    return {
        ...repositoryHelpers.setupDefaultRepository<Project>(tableName, db),
        getAllForUserId: new DataLoader(async (userIds: number[]) => {
            const projects = await db(tableName).whereIn('userId', userIds);

            return userIds.map((userId) =>
                projects.filter((project) => project.userId === userId)
            );
        }),
    };
};
