import context from '../context';
import { NextFunction, Response } from 'express';
import { CustomRequest } from '../types/CustomRequest';

export default (req: CustomRequest, res: Response, next: NextFunction) =>
    context(req, res)
        .then((context) => {
            req.context = context;
            next();
        })
        .catch(next);
