import gql from 'graphql-tag';
import * as GraphqlISODate from 'graphql-iso-date';

export const schema = gql`
    scalar Date
    scalar Time
    scalar DateTime
`;

export const resolvers = {
    Date: GraphqlISODate.GraphQLDate,
    Time: GraphqlISODate.GraphQLTime,
    DateTime: GraphqlISODate.GraphQLDateTime,
};
