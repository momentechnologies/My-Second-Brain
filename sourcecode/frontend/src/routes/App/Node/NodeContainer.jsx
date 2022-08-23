import React from 'react';
import Node from './Node';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import DefaultHookQuery from '../../../components/DefaultHookQuery';
import { Button, TableCell, TableRow } from '@mui/material';

const getNodeQuery = gql`
    query GetNodeQuery($id: Int!) {
        node(id: $id) {
            id
            name
            content
            createdAt
        }
    }
`;

const NodeContainer = () => {
    let { nodeId } = useParams();

    return (
        <DefaultHookQuery
            queryHookData={useQuery(getNodeQuery, {
                variables: {
                    id: parseInt(nodeId),
                },
            })}
        >
            {({ data, refetch }) => {
                return <Node node={data.node} />;
            }}
        </DefaultHookQuery>
    );
};

export default NodeContainer;
