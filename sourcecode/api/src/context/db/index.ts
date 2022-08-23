import defaultDb from '../../services/db';
import { Knex } from 'knex';

import node from './node';
import project from './project';
import task from './task';
import user from './user';

export default (db: Knex = defaultDb) => ({
    node: node(db),
    project: project(db),
    task: task(db),
    user: user(db),
});
