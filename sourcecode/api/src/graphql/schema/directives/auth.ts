import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';
import gql from 'graphql-tag';
import { isLoggedIn } from '../../../services/authorization';
import { Context } from '../../../context';

export default (directiveName: string = 'auth') => {
    return {
        authDirectiveTypeDefs: gql`
            directive @${directiveName}(test: String) on FIELD_DEFINITION
        `,
        authDirectiveTransformer: (schema: GraphQLSchema) =>
            mapSchema(schema, {
                [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
                    const authDirective = getDirective(
                        schema,
                        fieldConfig,
                        directiveName
                    )?.[0];

                    if (authDirective) {
                        const { resolve: defaultFieldResolver } = fieldConfig;
                        fieldConfig.resolve = async (
                            source,
                            args,
                            context: Context,
                            info
                        ) => {
                            await isLoggedIn(context);

                            return await defaultFieldResolver(
                                source,
                                args,
                                context,
                                info
                            );
                        };
                        return fieldConfig;
                    }
                },
            }),
    };
};
