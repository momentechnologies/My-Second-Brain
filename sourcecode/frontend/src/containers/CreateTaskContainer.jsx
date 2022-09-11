import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { ManagedForm } from '../components/ManagedForm';

const CREATE_QUICK_TASK = gql`
    mutation createTask($data: CreateTaskInput!) {
        createTask(data: $data) {
            id
        }
    }
`;

const defaultValues = {
    name: '',
};

const CreateTaskContainer = ({ onCreated, children, contextValues = {} }) => {
    const [createTask, createTaskStatus] = useMutation(CREATE_QUICK_TASK);
    const [values, setValues] = React.useState(defaultValues);
    const setValue = (key, value) =>
        setValues({
            ...values,
            [key]: value,
        });

    const onCreateNew = () => {
        createTask({
            variables: {
                data: { ...values, ...contextValues },
            },
        }).then(() => {
            setValues(defaultValues);
            onCreated();
        });
    };

    return (
        <ManagedForm error={createTaskStatus.error}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onCreateNew();
                }}
            >
                {children({
                    onSubmit: onCreateNew,
                    values,
                    setValue,
                })}
            </form>
        </ManagedForm>
    );
};

export default CreateTaskContainer;
