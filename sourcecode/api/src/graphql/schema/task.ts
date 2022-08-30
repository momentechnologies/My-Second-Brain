import gql from 'graphql-tag';
import { Context } from '../../context';
import validateJoi from '../../services/validateJoi';
import Joi from 'joi';
import NotFoundException from '../../exceptions/notFound';
import { Task } from '../../context/db/task';
import { graphqlUpdateDataBuilder } from '../../services/db/graphqlUpdateDataBuilder';
import { projectStatuses } from '../../context/db/project';

export const schema = gql`
    type Mutation {
        createQuickTask(name: String!): Task @auth
        updateTask(id: Int!, data: UpdateTaskInput!): Task @auth
        deleteTask(taskId: Int!): Boolean @auth
    }

    type Query {
        tasks(filters: GetTasksFiltersInput! = {}): [Task!]! @auth
    }

    input GetTasksFiltersInput {
        onlyUnassigned: Boolean = false
        showIsDone: Boolean = false
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
        createQuickTask: async (_, args, context: Context) => {
            const { name } = validateJoi(
                args,
                Joi.object().keys({
                    name: Joi.string().min(1).required(),
                })
            );

            return await context.db().task.create({
                name,
                userId: context.user.id,
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
