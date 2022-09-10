import defaultDb from '../../services/db';
import { Knex } from 'knex';

import node from './node';
import note from './note';
import project from './project';
import task from './task';
import user from './user';
import subscription from './subscription';

export default (db: Knex = defaultDb) => ({
    node: node(db),
    note: note(db),
    project: project(db),
    subscription: subscription(db),
    task: task(db),
    user: user(db),
});
