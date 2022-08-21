import Winston from 'winston';

const logger = Winston.createLogger({
    level: 'debug',
    transports: [
        new Winston.transports.Console({
            format: Winston.format.simple(),
        }),
    ],
});

export default logger;
