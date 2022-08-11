import { Request } from 'express';
import { Context } from '../context';
import { TokenUser } from './TokenUser';

export interface CustomRequest extends Request {
    context: Context;
    user: TokenUser;
}
