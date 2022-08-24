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
            tasks(filters: { onlyIsNotDone: true }) {
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
                variables: {
                    id: parseInt(projectId),
                },
            })}
        >
            {({ data, refetch }) => {
                return <Project project={data.project} />;
            }}
        </DefaultHookQuery>
    );
};

export default ProjectContainer;
