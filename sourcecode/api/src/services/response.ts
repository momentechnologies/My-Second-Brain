import Stream from 'stream';
import { Response } from 'express';

export const stream = (
    stream: Stream.Readable,
    res: Response,
    extraPipes = []
) => {
    return new Promise<void>((resolve, reject) => {
        let newStream = stream
            .on('error', () => {
                reject(new Error('Problems finding file'));
            })
            .on('end', function () {
                resolve();
            });

        newStream = extraPipes.reduce(
            (newStream, pipe) => newStream.pipe(pipe),
            newStream
        );
        newStream.pipe(res);
    });
};
