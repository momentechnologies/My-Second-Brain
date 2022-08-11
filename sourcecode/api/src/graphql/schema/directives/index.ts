import auth from './auth';

const { authDirectiveTransformer, authDirectiveTypeDefs } = auth();

export default {
    types: [authDirectiveTypeDefs],
    decorate: (schema) => {
        return [authDirectiveTransformer].reduce(
            (schema, transformer) => transformer(schema),
            schema
        );
    },
};
