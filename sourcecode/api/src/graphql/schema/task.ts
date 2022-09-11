import gql from 'graphql-tag';
import { Context } from '../../context';
import validateJoi from '../../services/validateJoi';
import Joi from 'joi';
import NotFoundException from '../../exceptions/notFound';
import { graphqlUpdateDataBuilder } from '../../services/db/graphqlUpdateDataBuilder';

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
        context: String
        dueBefore: DateTime
    }

    input CreateTaskInput {
        name: String!
        projectId: Int
        context: String
        dueAt: DateTime
        isDone: Boolean
        isArchived: Boolean
    }

    input UpdateTaskInput {
        name: String
        projectId: Int
        context: String
        dueAt: DateTime
        isDone: Boolean
        isArchived: Boolean
    }

    type Task {
        id: Int!
        projectId: Int
        context: String
        dueAt: DateTime
        project: Project
        name: String!
        isDone: Boolean!
        isArchived: Boolean!
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
            } = validateJoi(
                data,
                Joi.object().keys({
                    name: Joi.string().min(1).required(),
                    projectId: Joi.number().min(1).allow(null).optional(),
                })
            );

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
                }
            );

            return await context.db().task.create({
                ...optionalDataToSet,
                userId: context.user.id,
                name: parsedData.name,
                isDone: false,
                isArchived: false,
            });
        },
        updateTask: async (_, { id, data }, context: Context) => {
            const task = await context.db().task.getById.load(id);

            if (!task || task.userId !== context.user.id) {
                throw new NotFoundException('task');
            }

            const parsedData = validateJoi(
                data,
                Joi.object().keys({
                    name: Joi.string().min(1).optional(),
                    isDone: Joi.boolean().optional(),
                    projectId: Joi.number().min(1).allow(null).optional(),
                    dueAt: Joi.date().allow(null).optional(),
                    context: Joi.string()
                        .valid('doNext', 'delegated', 'someday')
                        .allow(null)
                        .optional(),
                })
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
                isDone: async (value) => value,
                context: async (value) => value,
                dueAt: async (value) => value,
                name: async (value) => value,
            });

            return await context.db().task.updateById(id, dataToUpdate);
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
                context: filters.context,
                dueBefore: filters.dueBefore,
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
