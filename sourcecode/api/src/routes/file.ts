import Express, { Response } from 'express';
import runAsync from '../services/runAsync';
import { CustomRequest } from '../types/CustomRequest';
import validateJoi from '../services/validateJoi';
import Joi from 'joi';
import * as Storage from '../services/storage';
import * as ResponseService from '../services/response';

const router = Express.Router();

router.get(
    '/downloads',
    runAsync(async (req: CustomRequest, res: Response) => {
        console.log('here');
        const validatedQuery = validateJoi(
            req.query,
            Joi.object().keys({
                filePath: Joi.string().required(),
                bucketName: Joi.string().required(),
            })
        );

        const stream = await Storage.get({
            fileName: validatedQuery.filePath,
            bucketName: validatedQuery.bucketName,
        });

        await ResponseService.stream(stream, res);
    })
);

export default router;
