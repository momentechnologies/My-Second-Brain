import React from 'react';
import Process from './Process';
import { gql, useQuery } from '@apollo/client';

const getUnassignedTasks = gql`
    query GetUnassignedTasks {
        tasks(filters: { onlyUnassigned: true }) {
            id
            name
            isDone
            projectId
        }
        notes(filters: { onlyUnassigned: true }) {
            id
            name
            parentNodeId
            content
        }
    }
`;

const ProcessContainer = () => {
    const queryHookData = useQuery(getUnassignedTasks);

    return <Process queryHookData={queryHookData} />;
};

export default ProcessContainer;
