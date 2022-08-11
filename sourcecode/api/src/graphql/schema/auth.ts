import gql from 'graphql-tag';
import bcrypt from 'bcrypt';
import { Context } from '../../context';
import NotFoundException from '../../exceptions/notFound';
import validateJoi from '../../services/validateJoi';
import Joi from 'joi';
import ClientException from '../../exceptions/client';
import * as TokenService from '../../services/token';

const hashPassword = (password) => bcrypt.hashSync(password, 10);
console.log(hashPassword('123456789'));
export const schema = gql`
    type Mutation {
        login(email: String!, password: String!): User
        logout: Boolean
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

            const user = await context.db().user.getByEmail.load(email);

            if (!user) {
                throw new ClientException(
                    'Wrong email or password.',
                    'wrong_credentials'
                );
            }

            if (!bcrypt.compareSync(password, user.password)) {
                throw new ClientException(
                    'Wrong email or password.',
                    'wrong_credentials'
                );
            }

            await TokenService.addJwtToResponse(context.res, user);

            return user;
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
