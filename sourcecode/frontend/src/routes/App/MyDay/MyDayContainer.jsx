import React from 'react';
import MyDay from './MyDay';
import { gql, useQuery } from '@apollo/client';
import DefaultHookQuery from '../../../components/DefaultHookQuery';

const getProjectQuery = gql`
    query GetMyDay {
        tasks(filters: { onlyIsNotDone: true }) {
            id
            name
            isDone
            createdAt
            project {
                id
                name
            }
        }
    }
`;

const MyDayContainer = () => {
    return (
        <DefaultHookQuery
            queryHookData={useQuery(getProjectQuery, {
                fetchPolicy: 'network-only',
            })}
        >
            {({ data, refetch }) => {
                return <MyDay tasks={data.tasks} />;
            }}
        </DefaultHookQuery>
    );
};

export default MyDayContainer;
