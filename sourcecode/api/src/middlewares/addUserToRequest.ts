import * as Token from '../services/token';
import { NextFunction, Response } from 'express';
import { CustomRequest } from '../types/CustomRequest';

const handle = async (req: CustomRequest) => {
    req.context.user = null;

    const authToken = req.cookies && req.cookies.authToken;

    if (!authToken) {
        return;
    }

    const payload = Token.verify(req.cookies.authToken);

    if (!payload) {
        return;
    }

    req.context.user = payload.payload.user;
};

export default (req: CustomRequest, res: Response, next: NextFunction) =>
    handle(req).then(next).catch(next);
