import user from './user';
import defaultDb from '../../services/db';
import { Knex } from 'knex';
import task from './task';
import project from './project';

export default (db: Knex = defaultDb) => ({
    project: project(db),
    task: task(db),
    user: user(db),
});
