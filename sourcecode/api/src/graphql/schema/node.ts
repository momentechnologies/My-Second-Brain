import gql from 'graphql-tag';
import { Context } from '../../context';
import validateJoi from '../../services/validateJoi';
import Joi from 'joi';
import NotFoundException from '../../exceptions/notFound';
import { graphqlUpdateDataBuilder } from '../../services/db/graphqlUpdateDataBuilder';
import ValidationException, {
    validationError,
} from '../../exceptions/validation';

export const schema = gql`
    type Mutation {
        createNode(name: String!, content: String!): Task @auth
        updateNode(id: Int!, data: UpdateNodeInput!): Node @auth
    }

    input UpdateNodeInput {
        name: String
        content: String
        parentNodeId: Int
        isArchived: Boolean
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
        updateNode: async (_, { id, data }, context: Context) => {
            const node = await context.db().node.getById.load(id);

            if (!node || node.userId !== context.user.id) {
                throw new NotFoundException('node');
            }

            const validatedData = validateJoi(
                data,
                Joi.object().keys({
                    name: Joi.string().min(1).optional(),
                    content: Joi.string().min(1).optional(),
                    parentNodeId: Joi.number().min(1).allow(null).optional(),
                })
            );

            const dataToUpdate = await graphqlUpdateDataBuilder(validatedData, {
                parentNodeId: async (parentNodeId) => {
                    if (parentNodeId === null) {
                        return null;
                    }

                    const parentNode = await context
                        .db()
                        .node.getById.load(parentNodeId);

                    if (!parentNode || parentNode.userId !== context.user.id) {
                        throw new ValidationException(
                            validationError(
                                'parentNodeId',
                                'Parent node ID not found'
                            )
                        );
                    }

                    return parentNode.id;
                },
                name: async (value) => value,
                content: async (value) => value,
                isArchived: async (value) => value,
            });

            return await context.db().node.updateById(node.id, dataToUpdate);
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
