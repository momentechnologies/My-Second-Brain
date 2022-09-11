import React from 'react';
import Project from './Project';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import DefaultHookQuery from '../../../components/DefaultHookQuery';

const getProjectQuery = gql`
    query GetProjectQuery($id: Int!) {
        project(id: $id) {
            id
            name
            tasks(filters: {}) {
                id
                name
                isDone
                createdAt
            }
        }
    }
`;

const ProjectContainer = () => {
    let { projectId } = useParams();

    return (
        <DefaultHookQuery
            queryHookData={useQuery(getProjectQuery, {
                fetchPolicy: 'network-only',
                variables: {
                    id: parseInt(projectId),
                },
            })}
        >
            {({ data, refetch }) => {
                return <Project project={data.project} refetch={refetch} />;
            }}
        </DefaultHookQuery>
    );
};

export default ProjectContainer;
