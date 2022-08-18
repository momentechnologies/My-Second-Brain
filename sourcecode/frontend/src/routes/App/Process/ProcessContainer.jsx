import React from 'react';
import Process from './Process';
import { gql, useQuery } from '@apollo/client';

const getUnassignedTasks = gql`
    query GetUnassignedTasks {
        tasks(filters: { onlyUnassigned: true }) {
            id
            name
            isDone
        }
    }
`;

const ProcessContainer = () => {
    const queryHookData = useQuery(getUnassignedTasks);

    return (
        <Process
            queryHookData={queryHookData}
            updateTaskProject={(taskId, projectId) => {}}
            deleteTask={(taskId) => {}}
        />
    );
};

export default ProcessContainer;
