import React from 'react';
import EditNode from './EditNode';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultHookQuery from '../../../components/DefaultHookQuery';

const CREATE_NODE = gql`
    mutation CreateNode($name: String!, $content: String!) {
        createNode(name: $name, content: $content) {
            id
        }
    }
`;

const UPDATE_NODE = gql`
    mutation UpdateNode($id: Int!, $data: UpdateNodeInput!) {
        updateNode(id: $id, data: $data) {
            id
            content
            name
        }
    }
`;

const getNodeQuery = gql`
    query GetNodeQuery($id: Int!) {
        node(id: $id) {
            id
            name
            content
            createdAt
        }
    }
`;

const EditNodeContainer = ({ node }) => {
    const [values, setValues] = React.useState(
        node
            ? { name: node.name, content: node.content }
            : { name: '', content: null }
    );
    const [createNode, createMetadata] = useMutation(CREATE_NODE);
    const [updateNode, updateNodeMetadata] = useMutation(UPDATE_NODE);
    let navigate = useNavigate();

    return (
        <EditNode
            initialValues={node}
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

                if (node) {
                    updateNode({
                        variables: {
                            id: node.id,
                            data: {
                                name: values.name,
                                content: JSON.stringify(values.content),
                            },
                        },
                    }).then(({ data }) => {
                        navigate('/app/nodes/' + data.updateNode.id);
                    });
                } else {
                    createNode({
                        variables: {
                            name: values.name,
                            content: JSON.stringify(values.content),
                        },
                    }).then(({ data }) => {
                        navigate('/app/nodes/' + data.createNode.id);
                    });
                }
            }}
            error={createMetadata.error || updateNodeMetadata.error}
        />
    );
};

const Loader = ({ nodeId, ...props }) => {
    return (
        <DefaultHookQuery
            queryHookData={useQuery(getNodeQuery, {
                variables: {
                    id: parseInt(nodeId),
                },
            })}
        >
            {({ data, refetch }) => {
                return (
                    <EditNodeContainer
                        {...props}
                        node={data.node}
                        refetch={refetch}
                    />
                );
            }}
        </DefaultHookQuery>
    );
};

const Wrapper = (props) => {
    const { nodeId } = useParams();

    if (nodeId) {
        return <Loader {...props} nodeId={nodeId} />;
    }

    return <EditNodeContainer {...props} />;
};

export default Wrapper;
