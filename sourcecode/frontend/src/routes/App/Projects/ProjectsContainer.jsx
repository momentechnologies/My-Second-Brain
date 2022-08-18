import React from 'react';
import Projects from './Projects';
import { gql, useMutation, useQuery } from '@apollo/client';
import ProjectForm from './ProjectForm';

const getProjectsQuery = gql`
    query GetProjectsQuery {
        projects {
            id
            name
            status
            createdAt
        }
    }
`;

const CREATE_PROJECT = gql`
    mutation CreateProject($data: CreateProjectInput!) {
        createProject(data: $data) {
            id
        }
    }
`;

const UPDATE_PROJECT = gql`
    mutation UpdateProject($id: Int!, $data: UpdateProjectInput!) {
        updateProject(id: $id, data: $data) {
            id
        }
    }
`;

const ProjectsContainer = () => {
    const queryHookData = useQuery(getProjectsQuery);
    const [dialogInfo, setDialogInfo] = React.useState({
        open: false,
        values: null,
    });
    const [createPoleGprScans, createMetadata] = useMutation(CREATE_PROJECT);
    const [updatePoleGprScan, updateMetadata] = useMutation(UPDATE_PROJECT);

    return (
        <>
            <Projects
                queryHookData={queryHookData}
                onCreateNew={() => setDialogInfo({ open: true })}
                onUpdate={(project) => {
                    setDialogInfo({
                        open: true,
                        values: project,
                    });
                }}
            />
            <ProjectForm
                defaultValues={dialogInfo.values}
                onSubmit={(values) => {
                    const parsedValues = {
                        name: values.name,
                        status: values.status,
                    };

                    let action;
                    if (dialogInfo.values) {
                        action = updatePoleGprScan({
                            variables: {
                                id: values.id,
                                data: parsedValues,
                            },
                        });
                    } else {
                        action = createPoleGprScans({
                            variables: {
                                data: parsedValues,
                            },
                        });
                    }
                    action.then(() => {
                        queryHookData.refetch();
                        setDialogInfo({ open: false });
                    });
                }}
                onClose={() => setDialogInfo({ open: false })}
                isOpen={dialogInfo.open}
                error={createMetadata.error || updateMetadata.error}
            />
        </>
    );
};

export default ProjectsContainer;
