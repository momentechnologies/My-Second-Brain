import * as Token from '../services/token';
import { NextFunction, Response } from 'express';
import { CustomRequest } from '../types/CustomRequest';
import { TokenUser } from '../types/TokenUser';

const authFromApiKey = async (
    req: CustomRequest
): Promise<null | TokenUser> => {
    let apiKey = req.headers['x-api-key'];
    let apiUserId = req.headers['x-api-user-id'];

    if (Array.isArray(apiKey)) {
        apiKey = apiKey[0];
    }

    if (Array.isArray(apiUserId)) {
        apiUserId = apiUserId[0];
    }

    if (!apiKey || !apiUserId) {
        return null;
    }

    const key = await req.context
        .db()
        .userApiKey.getByUsedIdAndKey(apiUserId, apiKey);

    if (key) {
        // Update the last used time to now
        await req.context.db().userApiKey.updateById(key.id, {
            lastUsed: new Date(),
        });
    } else {
        return null;
    }

    return await req.context.db().user.getById.load(parseInt(apiUserId));
};

const handle = async (req: CustomRequest) => {
    req.context.user = null;

    const user = await authFromApiKey(req);

    if (user) {
        req.context.user = user;
        return;
    }

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
