import React from 'react';
import Nodes from './Nodes';
import { gql, useQuery } from '@apollo/client';

const getNodesQuery = gql`
    query GetNodes($parentNodeId: Int) {
        nodes(parentNodeId: $parentNodeId) {
            id
            name
        }
    }
`;

const NodesContainer = () => {
    const queryHookData = useQuery(getNodesQuery, {
        fetchPolicy: 'network-only',
    });

    return <Nodes queryHookData={queryHookData} />;
};

export default NodesContainer;
