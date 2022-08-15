import ClientException from '../exceptions/client';
import NotFoundException from '../exceptions/notFound';
import ValidationException, {
    validationError,
    validationTypes,
} from '../exceptions/validation';
import * as TokenUtils from './token';
import * as EmailUtils from './email';
import bcrypt from 'bcrypt';
import { newConfirmationEmail } from './email';
import { Context } from '../context';

export const hashPassword = (password) => bcrypt.hashSync(password, 10);

export const login = async (
    context: Context,
    email: string,
    password: string
) => {
    const user = await context.db().user.getByEmail.load(email);

    if (!user) {
        throw new ClientException(
            'Wrong email or password.',
            'wrong_credentials'
        );
    }

    if (!user.password) {
        throw new ClientException(
            'Please reset your password',
            'no_password_set'
        );
    }

    if (!bcrypt.compareSync(password, user.password)) {
        throw new ClientException(
            'Wrong email or password.',
            'wrong_credentials'
        );
    }

    return user;
};

export const newConfirmEmail = async (context: Context, userId) => {
    const user = await context.db().user.getById.load(userId);

    if (!user) {
        throw new NotFoundException('user');
    }

    await newConfirmationEmail(context, user);
};

export const signup = async (
    context: Context,
    email: string,
    password: string
) => {
    const userInDb = await context.db().user.getByEmail.load(email);

    if (userInDb && userInDb.password) {
        throw new ValidationException(
            validationError(
                'email',
                'Email is already in use',
                validationTypes.ALREADY_EXISTS
            )
        );
    }

    let user;
    if (userInDb) {
        user = await context.db().user.updateById(userInDb.id, {
            password: hashPassword(password),
        });
    } else {
        user = await context.db().user.create({
            email,
            password: hashPassword(password),
            emailConfirmed: false,
        });
    }

    await newConfirmationEmail(context, user);

    return user;
};

export const confirmEmail = async (context: Context, token) => {
    const payload = TokenUtils.verify(token);

    if (!payload || payload.payload.type !== 'confirm-email') {
        throw new ValidationException(
            validationError('token', 'Token is invalid')
        );
    }

    return await context.db().user.updateById(payload.payload.user.id, {
        emailConfirmed: true,
    });
};

export const resetPassword = async (context: Context, token, newPassword) => {
    let tokenPayload;

    try {
        tokenPayload = TokenUtils.decrypt(token);
    } catch {
        throw new ValidationException(
            validationError(
                'token',
                'Reset token is invalid. Please reset your password again.',
                validationTypes.INVALID_PARAMETER
            )
        );
    }

    if (!tokenPayload.user || !tokenPayload.resetPassword) {
        throw new ValidationException(
            validationError(
                'token',
                'Reset token is invalid. Please reset your password again.',
                validationTypes.INVALID_PARAMETER
            )
        );
    }

    let user = await context.db().user.getById.load(tokenPayload.user.id);

    if (!user) {
        throw new ValidationException(
            validationError(
                'token',
                'Reset token is invalid. Please reset your password again.',
                validationTypes.INVALID_PARAMETER
            )
        );
    }

    await context.db().user.updateById(user.id, {
        password: hashPassword(newPassword),
        emailConfirmed: true,
    });

    return user;
};

export const newPasswordRequest = async (context, email) => {
    let user = await context.db().user.getByEmail.load(email);

    if (!user) {
        return true;
    }

    await resetPasswordEmail(context, user);

    return true;
};

const resetPasswordEmail = async (context, user) => {
    const token = TokenUtils.encrypt({
        user: {
            id: user.id,
        },
        resetPassword: true,
    });

    await EmailUtils.sendResetPasswordEmail(context, user.email, token);
};
