import gql from 'graphql-tag';
import NotFoundException from '../../exceptions/notFound';
import { Context } from '../../context';

export const schema = gql`
    type Query {
        me: User @auth
    }

    type User {
        id: Int!
        email: String!
        emailConfirmed: Boolean!
        firstName: String
        lastName: String
    }
`;

export const resolvers = {
    Query: {
        me: async (_, args, context: Context) => {
            const user = await context.db().user.getById.load(context.user.id);

            if (!user) {
                throw new NotFoundException('user');
            }

            return {
                user,
            };
        },
    },
};
