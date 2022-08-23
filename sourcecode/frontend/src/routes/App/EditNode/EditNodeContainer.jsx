import React from 'react';
import EditNode from './EditNode';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_NODE = gql`
    mutation CreateProject($name: String!, $content: String!) {
        createNode(name: $name, content: $content) {
            id
        }
    }
`;

const EditNodeContainer = () => {
    const [values, setValues] = React.useState({ name: '', content: null });
    const [createNode, createMetadata] = useMutation(CREATE_NODE);
    let navigate = useNavigate();

    return (
        <EditNode
            values={values}
            setValue={(key, value) =>
                setValues({
                    ...values,
                    [key]: value,
                })
            }
            onSubmit={() => {
                if (!values.content) {
                    return;
                }
                createNode({
                    variables: {
                        name: values.name,
                        content: JSON.stringify(values.content),
                    },
                }).then(({ data }) => {
                    navigate('/app/nodes/' + data.createNode.id);
                });
            }}
            error={createMetadata.error}
        />
    );
};

export default EditNodeContainer;
