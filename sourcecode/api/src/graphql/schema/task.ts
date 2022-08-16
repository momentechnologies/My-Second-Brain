import gql from 'graphql-tag';
import { Context } from '../../context';
import validateJoi from '../../services/validateJoi';
import Joi from 'joi';

export const schema = gql`
    type Mutation {
        createQuickTask(name: String!): Task @auth
    }

    type Task {
        id: ID!
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
    },
};
