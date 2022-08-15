import gql from 'graphql-tag';
import { Context } from '../../context';
import NotFoundException from '../../exceptions/notFound';
import validateJoi from '../../services/validateJoi';
import Joi from 'joi';
import * as TokenService from '../../services/token';
import * as AuthService from '../../services/auth';
import { clearCookie } from '../../services/cookie';
import { hashPassword } from '../../services/auth';

export const schema = gql`
    type Mutation {
        login(email: String!, password: String!): User
        signup(email: String!, password: String!): User
        confirmEmail(token: String!): Boolean
        logout: Boolean
        newPasswordRequest(email: String!): Boolean
        newConfirmEmail: Boolean @auth
        resetPassword(token: String!, newPassword: String!): Boolean
        changePassword(password: String!): Boolean @auth
    }

    type Query {
        auth: AuthResponse @auth
    }

    input CreateAccountInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    type AuthResponse {
        user: User
    }
`;

const passwordValidation = Joi.string().min(6).required();

export const resolvers = {
    Mutation: {
        login: async (_, args, context: Context) => {
            const { email, password } = validateJoi(
                args,
                Joi.object().keys({
                    email: Joi.string().email().required(),
                    password: passwordValidation,
                })
            );

            const user = await AuthService.login(context, email, password);

            await TokenService.addJwtToResponse(context.res, user);

            return user;
        },
        signup: async (root, args, context) => {
            const { email, password } = validateJoi(
                args,
                Joi.object().keys({
                    email: Joi.string().email().required(),
                    password: passwordValidation,
                })
            );

            const user = await AuthService.signup(
                context,
                email.toLowerCase(),
                password
            );

            await TokenService.addJwtToResponse(context.res, user);

            return user;
        },
        confirmEmail: async (root, { token }, context) => {
            await AuthService.confirmEmail(context, token);

            return true;
        },
        logout: async (root, {}, context: Context) => {
            clearCookie(context.res, 'jwt');

            return true;
        },
        resetPassword: async (root, args, context: Context) => {
            const { token, newPassword } = validateJoi(
                args,
                Joi.object().keys({
                    token: Joi.string().min(10).required(),
                    newPassword: passwordValidation,
                })
            );

            const user = await AuthService.resetPassword(
                context,
                token,
                newPassword
            );

            await TokenService.addJwtToResponse(context.res, user);

            return true;
        },
        newPasswordRequest: async (root, args, context: Context) => {
            const { email } = validateJoi(
                args,
                Joi.object().keys({
                    email: Joi.string().email().required(),
                })
            );

            return await AuthService.newPasswordRequest(
                context,
                email.toLowerCase()
            );
        },
        newConfirmEmail: async (root, args, context: Context) => {
            return await AuthService.newConfirmEmail(context, context.user.id);
        },
        changePassword: async (root, args, context: Context) => {
            const { password } = validateJoi(
                args,
                Joi.object().keys({
                    password: passwordValidation,
                })
            );

            await context.db().user.updateById(context.user.id, {
                password: hashPassword(password),
            });

            clearCookie(context.res, 'jwt');

            return true;
        },
    },
    Query: {
        auth: async (_, args, context: Context) => {
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
