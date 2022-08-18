import React from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import DefaultHookQuery from './DefaultHookQuery';

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

const ProjectPicker = ({ onSetProjectId }) => {
    const queryHookData = useQuery(getProjectsQuery);
    const [value, setValue] = React.useState(null);

    return (
        <DefaultHookQuery queryHookData={queryHookData}>
            {({ data, refetch }) => {
                return (
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            onSetProjectId(newValue ? newValue.value : null);
                        }}
                        options={data.projects.map((p) => ({
                            label: p.name,
                            value: p.id,
                        }))}
                        renderInput={(params) => (
                            <TextField {...params} label="Project" />
                        )}
                    />
                );
            }}
        </DefaultHookQuery>
    );
};

export default ProjectPicker;
