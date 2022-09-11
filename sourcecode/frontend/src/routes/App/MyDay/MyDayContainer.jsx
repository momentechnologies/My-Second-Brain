import React from 'react';
import MyDay, { tabs } from './MyDay';
import { gql, useQuery } from '@apollo/client';
import DefaultHookQuery from '../../../components/DefaultHookQuery';

const getProjectQuery = gql`
    query GetMyDay($filters: GetTasksFiltersInput) {
        tasks(filters: $filters) {
            id
            name
            isDone
            createdAt
            dueAt
            context
            project {
                id
                name
            }
        }
    }
`;

const MyDayContainer = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);
    const queryHookData = useQuery(getProjectQuery, {
        fetchPolicy: 'network-only',
        variables: {
            filters: tabs[selectedTab].filters,
        },
    });

    return (
        <MyDay
            queryHookData={queryHookData}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
        />
    );
};

export default MyDayContainer;
