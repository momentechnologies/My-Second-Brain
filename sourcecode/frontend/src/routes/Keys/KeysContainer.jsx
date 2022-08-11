import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import DefaultHookQuery from '../../components/DefaultHookQuery';
import Keys from './Keys';

export const getKeysQuery = gql`
    query GetMyApiKeys {
        me {
            apiKeys {
                id
                lastUsed
                createdAt
            }
        }
    }
`;

const CREATE_USER_API_KEY_MUTATION = gql`
    mutation CreateUserApiKey {
        createUserApiKey
    }
`;

const DELETE_USER_API_KEY_MUTATION = gql`
    mutation DeleteUserApiKey($id: ID!) {
        deleteUserApiKey(id: $id)
    }
`;

const KeysContainer = () => {
    const [createUserApiKey, { error, loading }] = useMutation(
        CREATE_USER_API_KEY_MUTATION
    );
    const [deleteUserApiKey] = useMutation(DELETE_USER_API_KEY_MUTATION);
    const [newKeyValue, setNewKeyValue] = React.useState(null);

    return (
        <DefaultHookQuery
            queryHookData={useQuery(getKeysQuery, {
                errorPolicy: 'all',
            })}
        >
            {({ data, refetch }) => {
                return (
                    <Keys
                        keys={data.me.apiKeys}
                        onCreate={() => {
                            createUserApiKey().then(({ data }) => {
                                refetch();
                                setNewKeyValue(data.createUserApiKey);
                            });
                        }}
                        createKeyStatus={{
                            error,
                            loading,
                        }}
                        newKeyValue={newKeyValue}
                        onDelete={(id) =>
                            deleteUserApiKey({
                                variables: { id },
                            }).then(() => refetch())
                        }
                    />
                );
            }}
        </DefaultHookQuery>
    );
};

export default KeysContainer;
