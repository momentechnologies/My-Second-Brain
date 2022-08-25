import gql from 'graphql-tag';
import { Context } from '../../context';
import validateJoi from '../../services/validateJoi';
import Joi from 'joi';
import NotFoundException from '../../exceptions/notFound';

export const schema = gql`
    type Mutation {
        createNode(name: String!, content: String!): Task @auth
    }

    type Query {
        nodes(parentNodeId: Int): [Node!]! @auth
        node(id: Int!): Node @auth
    }

    type Node {
        id: Int!
        parentNodeId: Int
        name: String!
        content: String!
        nodes: [Node!]!
        notes: [Note!]!
        isArchived: Boolean!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
`;

export const resolvers = {
    Mutation: {
        createNode: async (_, args, context: Context) => {
            const { name, content } = validateJoi(
                args,
                Joi.object().keys({
                    name: Joi.string().min(1).required(),
                    content: Joi.string().min(1).required(),
                })
            );

            return await context.db().node.create({
                userId: context.user.id,
                name,
                content,
                isArchived: false,
            });
        },
    },
    Query: {
        nodes: async (_, { parentNodeId }, context: Context) => {
            return await context.db().node.getRootNodes(context.user.id);
        },
        node: async (_, { id }, context: Context) => {
            const node = await context.db().node.getById.load(id);
            if (!node || node.userId !== context.user.id) {
                throw new NotFoundException('node');
            }
            return node;
        },
    },
    Node: {
        content: ({ content }) => JSON.stringify(content),
        nodes: async ({ id }, { parentNodeId }, context: Context) => {
            return await context
                .db()
                .node.getAllForParentNodeId(context.user.id)
                .load(id);
        },
    },
};
