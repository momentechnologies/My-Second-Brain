import gql from 'graphql-tag';
import { Context } from '../../context';

export const schema = gql`
    type Mutation {
        createPole(pole: PoleInput!): Pole! @auth
    }

    type Query {
        pole(id: Int!): Pole @auth
        poles: [Pole!]! @auth
    }

    input PoleInput {
        name: String!
        totalHeight: Int
        diameter: Int!
        tags: [String!]!
    }

    type Pole {
        id: ID!
        userDefinedId: String!
        totalHeight: Int
        diameter: Int!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
`;

export const resolvers = {
    Query: {
        poles: (parent, args, context: Context) => context.db().pole.getAll(),
    },
    PoleGprScan: {
        pole: ({ poleId }, args, context: Context) =>
            context.db().pole.getById.load(poleId),
    },
};
