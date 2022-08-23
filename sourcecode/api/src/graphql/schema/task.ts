import gql from 'graphql-tag';
import { Context } from '../../context';
import validateJoi from '../../services/validateJoi';
import Joi from 'joi';
import NotFoundException from '../../exceptions/notFound';

export const schema = gql`
    type Mutation {
        createQuickTask(name: String!): Task @auth
        updateTaskProject(taskId: Int!, projectId: Int): Task @auth
        deleteTask(taskId: Int!): Boolean @auth
    }

    type Query {
        tasks(filters: GetTasksFiltersInput! = {}): [Task!]! @auth
    }

    input GetTasksFiltersInput {
        onlyUnassigned: Boolean
    }

    type Task {
        id: Int!
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
        updateTaskProject: async (
            _,
            { taskId, projectId },
            context: Context
        ) => {
            const task = await context.db().task.getById.load(taskId);

            if (!task || task.userId !== context.user.id) {
                throw new NotFoundException('task');
            }

            if (projectId) {
                const project = await context
                    .db()
                    .project.getById.load(projectId);

                if (!project || project.userId !== context.user.id) {
                    throw new NotFoundException('project');
                }
            }

            return await context.db().task.updateById(taskId, {
                projectId,
            });
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
            });
        },
    },
};
