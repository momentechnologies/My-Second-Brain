import React from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import DefaultHookQuery from './DefaultHookQuery';

const getNodesQuery = gql`
    query GetNodesQuery {
        nodes {
            id
            name
            createdAt
        }
    }
`;

const NodePicker = ({ onSetNodeId }) => {
    const queryHookData = useQuery(getNodesQuery);
    const [value, setValue] = React.useState(null);

    return (
        <DefaultHookQuery queryHookData={queryHookData}>
            {({ data, refetch }) => {
                return (
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            onSetNodeId(newValue ? newValue.value : null);
                        }}
                        options={data.nodes.map((p) => ({
                            label: p.name,
                            value: p.id,
                        }))}
                        renderInput={(params) => (
                            <TextField {...params} label="Node" />
                        )}
                    />
                );
            }}
        </DefaultHookQuery>
    );
};

export default NodePicker;
