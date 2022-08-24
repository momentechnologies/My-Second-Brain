import gql from 'graphql-tag';
import { Context } from '../../context';
import validateJoi from '../../services/validateJoi';
import Joi from 'joi';
import { projectStatuses } from '../../context/db/project';
import NotFoundException from '../../exceptions/notFound';

export const schema = gql`
    type Query {
        projects: [Project!]! @auth
        project(id: Int!): Project @auth
    }

    type Mutation {
        createProject(data: CreateProjectInput!): Project @auth
        updateProject(id: Int!, data: UpdateProjectInput!): Project @auth
    }

    input CreateProjectInput {
        name: String!
        status: String!
        deadline: DateTime
    }

    input UpdateProjectInput {
        name: String!
        status: String!
        deadline: DateTime
    }

    type Project {
        id: Int!
        name: String!
        status: String!
        isArchived: Boolean!
        deadline: DateTime
        createdAt: DateTime!
        updatedAt: DateTime!
        tasks(filters: GetTasksFiltersInput! = {}): [Task!]!
    }
`;

const projectValidation = Joi.object().keys({
    name: Joi.string().min(1).required(),
    status: Joi.string()
        .valid(...projectStatuses)
        .required(),
    deadline: Joi.string().isoDate().optional(),
});

export const resolvers = {
    Query: {
        projects: async (_, args, context: Context) =>
            context.db().project.getAllForUserId.load(context.user.id),
        project: async (_, { id }, context: Context) => {
            const project = await context.db().project.getById.load(id);

            if (!project || project.userId !== context.user.id) {
                throw new NotFoundException('project');
            }

            return project;
        },
    },
    Mutation: {
        createProject: async (_, { data }, context: Context) => {
            const { name, status, deadline } = validateJoi(
                data,
                projectValidation
            );

            return await context.db().project.create({
                name,
                userId: context.user.id,
                isArchived: false,
                status,
                deadline,
            });
        },
        updateProject: async (_, { id, data }, context: Context) => {
            const parsedId = parseInt(id);
            const { name, status, deadline } = validateJoi(
                data,
                projectValidation
            );

            const project = await context.db().project.getById.load(parsedId);

            if (!project || project.userId !== context.user.id) {
                throw new NotFoundException('id');
            }

            return await context.db().project.updateById(parsedId, {
                name,
                userId: context.user.id,
                isArchived: false,
                status,
                deadline,
            });
        },
    },
};
