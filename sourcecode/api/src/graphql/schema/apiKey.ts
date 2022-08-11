import gql from 'graphql-tag';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../context';
import Unauthorized from '../../exceptions/unauthorized';
import NotFoundException from '../../exceptions/notFound';

export const schema = gql`
    type Mutation {
        createUserApiKey: String @auth
        deleteUserApiKey(id: ID!): Boolean @auth
    }
    type UserApiKey {
        id: ID!
        userId: Int!
        lastUsed: DateTime!
        createdAt: DateTime!
    }
`;

export const resolvers = {
    Mutation: {
        createUserApiKey: async (_, args, context: Context) => {
            const apiKey = await context.db().userApiKey.create({
                userId: context.user.id,
                key: uuidv4(),
                lastUsed: new Date(),
            });

            return apiKey.key;
        },
        deleteUserApiKey: async (
            _,
            { id: idAsString }: { id: string },
            context: Context
        ) => {
            const id = parseInt(idAsString);
            const apiKey = await context.db().userApiKey.getById.load(id);

            if (!apiKey || apiKey.userId !== context.user.id) {
                throw new NotFoundException('id');
            }

            await context.db().userApiKey.deleteById(id);

            return true;
        },
    },
    User: {
        apiKeys: async ({ user }, args, context: Context) => {
            if (user.id !== context.user.id) {
                throw new Unauthorized(
                    'You are not allowed to access other users keys'
                );
            }

            return context.db().userApiKey.getByUsedId.load(user.id);
        },
    },
};
