import dbConfig from '../../config/db';
import knex, { Knex } from 'knex';
import chalk from 'chalk';
import moment from 'moment';
import path from 'path';
import logger from '../logger';

const queryBuilder = knex({
    client: 'pg',
    connection: {
        user: dbConfig.user,
        host: dbConfig.host,
        database: dbConfig.database,
        password: dbConfig.password,
        port: dbConfig.port,
        socketPath: dbConfig.socketPath,
    },
    migrations: {
        directory: path.resolve('./src/migrations'),
        tableName: 'migrations',
        loadExtensions: ['.js'],
    },
});

const times = {};

queryBuilder
    .on('query', (query) => {
        times[query.__knexQueryUid] = moment();
    })
    .on('query-response', (response, query, builder) => {
        if (times[query.__knexQueryUid]) {
            const sql = builder.toString();
            logger.debug(
                chalk.blue(
                    `DB query - ${moment().diff(
                        times[query.__knexQueryUid],
                        'ms'
                    )}ms - ${sql}`
                )
            );

            delete times[query.__knexQueryUid];
        }
    });

export default queryBuilder;
