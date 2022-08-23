import React from 'react';
import Nodes from './Nodes';
import { gql, useQuery } from '@apollo/client';

const getNodesQuery = gql`
    query GetProjectsQuery($parentNodeId: Int) {
        nodes(parentNodeId: $parentNodeId) {
            id
            name
        }
    }
`;

const NodesContainer = () => {
    const queryHookData = useQuery(getNodesQuery);
    return <Nodes queryHookData={queryHookData} />;
};

export default NodesContainer;
