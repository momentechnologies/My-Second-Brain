import React from 'react';
import GprScans from './GprScans';
import DefaultHookQuery from '../../components/DefaultHookQuery';
import { gql, useQuery } from '@apollo/client';
import { useArrayV2 } from 'moment-hooks';

export const getKeysQuery = gql`
    query GetGprScans($filters: PoleGprScansFiltersInput!) {
        poleGprScans(filters: $filters) {
            id
            pole {
                id
                userDefinedId
            }
            heightFromGround
            polarizationDirection
            withPec
            comment
            createdAt
        }
    }
`;

const GprScansContainer = () => {
    const [userDefinedPoleId, setUserDefinedPoleId] = React.useState('');
    const tags = useArrayV2([]);

    return (
        <GprScans
            queryHookData={useQuery(getKeysQuery, {
                errorPolicy: 'all',
                variables: {
                    filters: {
                        tags: tags.value,
                        userDefinedPoleId:
                            userDefinedPoleId.length !== 0
                                ? userDefinedPoleId
                                : null,
                    },
                },
            })}
            filters={{
                userDefinedPoleId: {
                    value: userDefinedPoleId,
                    set: setUserDefinedPoleId,
                },
            }}
            tags={tags}
        />
    );
};

export default GprScansContainer;
