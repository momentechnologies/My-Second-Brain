import config from '../config/jwt';
import JsonWebToken from 'jsonwebtoken';
import ApiException from '../exceptions/apiException';
import apiConfig from '../config/app';
import { addCookieToRes } from './cookie';
import { Response } from 'express';
import { TokenUser } from '../types/TokenUser';

export const encrypt = (payload: any, expireHours: number = 72, audience) =>
    JsonWebToken.sign(
        {
            payload,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * expireHours,
            aud: audience,
        },
        config.secret
    );

export const decrypt = (token: string) => {
    const decoded = JsonWebToken.decode(token);

    if (!decoded || typeof decoded !== 'object' || !decoded.payload) {
        throw new ApiException('Token is invalid');
    }

    return decoded.payload;
};

export const verify = (token: string, options?: any) =>
    JsonWebToken.verify(token, config.secret, options);

export const addJwtToResponse = async (
    res: Response,
    user: TokenUser,
    expireHours: number = 24 * 31
) => {
    addCookieToRes(
        res,
        'authToken',
        encrypt(
            {
                version: config.tokenVersion,
                user: {
                    id: user.id,
                    email: user.email,
                },
            },
            expireHours,
            `web:${apiConfig.apiUrl}`
        ),
        expireHours
    );
};
