import { CustomRequest } from './CustomRequest';
import { Express } from 'express';

export interface MulterRequest extends CustomRequest {
    file: Express.Multer.File;
}
