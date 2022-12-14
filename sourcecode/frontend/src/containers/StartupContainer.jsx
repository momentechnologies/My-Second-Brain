import React from 'react';
import { gql, useApolloClient } from '@apollo/client';
import { useQuery } from '@apollo/client';
import startupContext from '../contexts/startup.js';
import { authFragment } from './AuthProvider/AuthProviderContainer';
import getGraphqlError from '../helpers/getGraphqlError';

const QUERY = gql`
    query StartupQuery {
        ...AuthFragment
    }
    ${authFragment}
`;

const StartupContainer = ({ children }) => {
    const client = useApolloClient();
    const { error, loading, data, refetch } = useQuery(QUERY, {
        errorPolicy: 'all',
    });

    if (error) {
        const graphqlError = getGraphqlError(error);
        if (!graphqlError || graphqlError.type !== 'not_logged_in') {
            return <div>Noe skjedde</div>;
        }
    }

    if (loading) {
        return <div>loading</div>;
    }

    return (
        <startupContext.Provider
            value={{
                ...data,
                refetch,
                writeData: (data) => {
                    const existingData = client.readQuery({
                        query: QUERY,
                    });

                    client.writeQuery({
                        query: QUERY,
                        data: {
                            ...existingData,
                            ...data,
                        },
                    });
                },
            }}
        >
            {children}
        </startupContext.Provider>
    );
};

export default StartupContainer;
