import appConfig from '../config/app';
import { Response } from 'express';

export const addCookieToRes = (
    res: Response,
    name: string,
    value: string,
    expireHours: number = 72,
    options?: any
) =>
    res.cookie(name, value, {
        maxAge: 1000 * 60 * 60 * expireHours,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        domain: appConfig.cookieDomain,
        ...options,
    });

export const clearCookie = (res: Response, name: string) =>
    res.clearCookie(name, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        domain: appConfig.cookieDomain,
    });
