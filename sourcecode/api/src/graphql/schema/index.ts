import _ from 'lodash';
import * as SchemaTools from '@graphql-tools/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';

import * as auth from './auth';
import directives from './directives';
import * as externalTypes from './externalTypes';
import * as user from './user';
import * as apiKey from './apiKey';
import * as poleGprScan from './poleGprScan';
import * as pole from './pole';
import * as poleBvMillScan from './poleBvMillScan';

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
        get(directives.types, [
            auth,
            externalTypes,
            user,
            apiKey,
            pole,
            poleGprScan,
            poleBvMillScan,
        ])
    )
);
