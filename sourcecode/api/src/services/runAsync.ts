import ApiException from '../exceptions/apiException';
import { CustomRequest } from '../types/CustomRequest';

export default (callback, returnType: string = 'json') =>
    (req: CustomRequest, res, next) =>
        callback(req, res, next)
            .then((json) => json && res.json(json))
            .catch((err) => {
                if (returnType === 'html') {
                    if (err instanceof ApiException) {
                        res.sendStatus(err.getStatus());
                        return;
                    }
                }
                next(err);
            });
