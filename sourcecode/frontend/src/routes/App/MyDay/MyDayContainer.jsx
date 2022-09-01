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

    return (
        <DefaultHookQuery
            queryHookData={useQuery(getProjectQuery, {
                fetchPolicy: 'network-only',
                variables: {
                    filters: tabs[selectedTab].filters,
                },
            })}
        >
            {({ data, refetch }) => {
                return (
                    <MyDay
                        tasks={data.tasks}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                );
            }}
        </DefaultHookQuery>
    );
};

export default MyDayContainer;
