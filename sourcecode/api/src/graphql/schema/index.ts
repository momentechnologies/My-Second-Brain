import _ from 'lodash';
import * as SchemaTools from '@graphql-tools/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';

import directives from './directives';

import * as auth from './auth';
import * as externalTypes from './externalTypes';
import * as project from './project';
import * as task from './task';
import * as user from './user';

const get = (directiveTypes, services) => ({
    typeDefs: mergeTypeDefs([
        ...directiveTypes,
        ...services.map((s) => s.schema).filter((s) => s),
    ]),
    resolvers: services.reduce(
        (resolvers, service) =>
            service.resolvers
                ? _.merge({}, resolvers, service.resolvers)
                : resolvers,
        {}
    ),
});

export default directives.decorate(
    SchemaTools.makeExecutableSchema(
        get(directives.types, [auth, externalTypes, project, task, user])
    )
);
