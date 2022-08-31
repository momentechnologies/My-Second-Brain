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
                    filters: {
                        context: tabs[selectedTab].value,
                    },
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
