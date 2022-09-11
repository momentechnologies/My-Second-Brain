import gql from 'graphql-tag';
import { Context } from '../../context';
import validateJoi from '../../services/validateJoi';
import NotFoundException from '../../exceptions/notFound';
import { graphqlUpdateDataBuilder } from '../../services/db/graphqlUpdateDataBuilder';
import * as TaskService from '../../services/task';
import { setNulls } from '../../services/task';

export const schema = gql`
    type Mutation {
        createTask(data: CreateTaskInput!): Task @auth
        updateTask(id: Int!, data: UpdateTaskInput!): Task @auth
        deleteTask(taskId: Int!): Boolean @auth
    }

    type Query {
        tasks(filters: GetTasksFiltersInput! = {}): [Task!]! @auth
    }

    input GetTasksFiltersInput {
        onlyUnassigned: Boolean = false
        showIsDone: Boolean = false
        list: String
        dueBefore: DateTime
        listSpecificDateDateBefore: DateTime
    }

    input CreateTaskInput {
        name: String!
        projectId: Int
        list: String
        dueAt: DateTime
        isDone: Boolean
        isArchived: Boolean
        listSpecificDateDate: DateTime
        remindMeAt: DateTime
    }

    input UpdateTaskInput {
        name: String
        projectId: Int
        list: String
        dueAt: DateTime
        isDone: Boolean
        isArchived: Boolean
        listSpecificDateDate: DateTime
        remindMeAt: DateTime
    }

    type Task {
        id: Int!
        projectId: Int
        list: String
        dueAt: DateTime
        project: Project
        name: String!
        isDone: Boolean!
        isArchived: Boolean!
        listSpecificDateDate: DateTime
        remindMeAt: DateTime
        createdAt: DateTime!
        updatedAt: DateTime!
    }
`;

export const resolvers = {
    Mutation: {
        createTask: async (_, { data }, context: Context) => {
            const parsedData: {
                name: string;
                projectId?: number;
            } = validateJoi(data, TaskService.getJoiValidation());

            const optionalDataToSet = await graphqlUpdateDataBuilder(
                parsedData,
                {
                    projectId: async (projectId) => {
                        if (!projectId) {
                            return null;
                        }
                        const project = await context
                            .db()
                            .project.getById.load(projectId);

                        if (!project || project.userId !== context.user.id) {
                            throw new NotFoundException('project');
                        }

                        return project.id;
                    },
                    list: (value) => value,
                    listSpecificDateDate: (value) => value,
                    remindMeAt: (value) => value,
                }
            );

            return await context.db().task.create(
                setNulls({
                    ...optionalDataToSet,
                    userId: context.user.id,
                    name: parsedData.name,
                    isDone: false,
                    isArchived: false,
                })
            );
        },
        updateTask: async (_, { id, data }, context: Context) => {
            const task = await context.db().task.getById.load(id);

            if (!task || task.userId !== context.user.id) {
                throw new NotFoundException('task');
            }

            const parsedData = validateJoi(
                data,
                TaskService.getJoiValidation(true)
            );

            const dataToUpdate = await graphqlUpdateDataBuilder(parsedData, {
                projectId: async (projectId) => {
                    if (!projectId) {
                        return null;
                    }
                    const project = await context
                        .db()
                        .project.getById.load(projectId);

                    if (!project || project.userId !== context.user.id) {
                        throw new NotFoundException('project');
                    }

                    return project.id;
                },
                name: async (value) => value,
                isDone: async (value) => value,
                list: async (value) => value,
                dueAt: async (value) => value,
                listSpecificDateDate: async (value) => value,
                remindMeAt: async (value) => value,
            });

            return await context
                .db()
                .task.updateById(id, setNulls(dataToUpdate));
        },
        deleteTask: async (_, { taskId }, context: Context) => {
            const task = await context.db().task.getById.load(taskId);

            if (!task || task.userId !== context.user.id) {
                throw new NotFoundException('task');
            }

            await context.db().task.deleteById(taskId);

            return true;
        },
    },
    Query: {
        tasks: async (_, { filters }, context: Context) => {
            return await context.db().task.get(context.user.id, {
                onlyUnassigned: filters.onlyUnassigned,
                showIsDone: filters.showIsDone,
                list: filters.list,
                dueBefore: filters.dueBefore,
                listSpecificDateDateBefore: filters.listSpecificDateDateBefore,
            });
        },
    },
    Project: {
        tasks: ({ id: projectId }, { filters }, context: Context) =>
            context
                .db()
                .task.getAllForProjectIdWithFilters(filters)
                .load(projectId),
    },
};
