import user from './user';
import pole from './pole';
import defaultDb from '../../services/db';
import { Knex } from 'knex';
import poleBvMillScan from './poleBvMillScan';
import poleBvMillScanFile from './poleBvMillScanFile';
import userApiKey from './userApiKey';
import poleGprScan from './poleGprScan';
import poleGprScanFile from './poleGprScanFile';
import poleGprScanTag from './poleGprScanTag';

export default (db: Knex = defaultDb) => ({
    user: user(db),
    pole: pole(db),
    poleGprScan: poleGprScan(db),
    poleGprScanFile: poleGprScanFile(db),
    poleGprScanTag: poleGprScanTag(db),
    poleBvMillScan: poleBvMillScan(db),
    poleBvMillScanFile: poleBvMillScanFile(db),
    userApiKey: userApiKey(db),
});
