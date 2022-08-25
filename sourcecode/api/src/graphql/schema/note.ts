import gql from 'graphql-tag';
import { Context } from '../../context';
import validateJoi from '../../services/validateJoi';
import Joi from 'joi';
import NotFoundException from '../../exceptions/notFound';
import { Task } from '../../context/db/task';
import { graphqlUpdateDataBuilder } from '../../services/db/graphqlUpdateDataBuilder';

export const schema = gql`
    type Mutation {
        createNote(data: CreateNoteInput!): Note @auth
        updateNote(id: Int!, data: UpdateNoteInput!): Note @auth
        deleteNote(noteId: Int!): Boolean @auth
    }

    type Query {
        notes(filters: GetNotesFiltersInput! = {}): [Node!]! @auth
        note(id: Int!): Node @auth
    }

    input GetNotesFiltersInput {
        onlyUnassigned: Boolean = false
    }

    input CreateNoteInput {
        name: String!
        content: String!
        parentNodeId: Int
        isArchived: Boolean
    }

    input UpdateNoteInput {
        name: String
        content: String
        parentNodeId: Int
        isArchived: Boolean
    }

    type Note {
        id: Int!
        parentNodeId: Int
        name: String!
        content: String!
        isArchived: Boolean!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
`;

export const resolvers = {
    Mutation: {
        createNote: async (_, { data }, context: Context) => {
            const validatedData = validateJoi(
                data,
                Joi.object().keys({
                    name: Joi.string().min(1).required(),
                    content: Joi.string().min(1).required(),
                    parentNodeId: Joi.number().min(1).allow(null).optional(),
                })
            );
            console.log(validatedData);

            return await context.db().note.create({
                userId: context.user.id,
                ...validatedData,
                isArchived: false,
            });
        },
        updateNote: async (_, { id, data }, context: Context) => {
            const note = await context.db().note.getById.load(id);

            if (!note || note.userId !== context.user.id) {
                throw new NotFoundException('note');
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
                        throw new NotFoundException('parentNode');
                    }

                    return parentNode.id;
                },
                name: async (value) => value,
                content: async (value) => value,
                isArchived: async (value) => value,
            });

            return await context.db().note.updateById(note.id, dataToUpdate);
        },
        deleteNote: async (_, { noteId }, context: Context) => {
            const note = await context.db().note.getById.load(noteId);

            if (!note || note.userId !== context.user.id) {
                throw new NotFoundException('note');
            }

            await context.db().note.deleteById(noteId);

            return true;
        },
    },
    Query: {
        notes: async (_, { filters }, context: Context) => {
            return await context.db().note.get(context.user.id, {
                onlyUnassigned: filters.onlyUnassigned,
            });
        },
        note: async (_, { id }, context: Context) => {
            const note = await context.db().note.getById.load(id);
            if (!note || note.userId !== context.user.id) {
                throw new NotFoundException('note');
            }
            return note;
        },
    },
    Note: {
        content: ({ content }) => JSON.stringify(content),
    },
    Node: {
        notes: async ({ id: nodeId }, { filters }, context: Context) => {
            return await context
                .db()
                .note.getAllForParentNodeId(context.user.id)
                .load(nodeId);
        },
    },
};
