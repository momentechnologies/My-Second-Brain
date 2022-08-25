import React from 'react';
import { Alert, Box, Button, Divider, Paper, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import ManagedTextField from '../../../components/ManagedForm/ManagedTextField';
import { gql, useMutation } from '@apollo/client';
import { ManagedForm } from '../../../components/ManagedForm';
import { LoadingButton } from '@mui/lab';

const CREATE_QUICK_TASK = gql`
    mutation CreateQuickTask($name: String!) {
        createQuickTask(name: $name) {
            id
        }
    }
`;

const defaultValues = {
    name: '',
};
const CreateQuickTaskCard = () => {
    const [createQuickTask, { error, loading }] =
        useMutation(CREATE_QUICK_TASK);

    const [values, setValues] = React.useState(defaultValues);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const setValue = (key, value) =>
        setValues({
            ...values,
            [key]: value,
        });

    const onSubmit = () => {
        setIsSuccess(false);
        createQuickTask({
            variables: values,
        }).then(() => {
            setValues(defaultValues);
            setIsSuccess(true);
        });
    };

    return (
        <Paper component={Box} p={2} mt={2}>
            <h2>Quickly create task</h2>
            <ManagedForm error={error}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <Box display="flex">
                        <ManagedTextField
                            inputKey="name"
                            value={values.name}
                            onChange={(e) => setValue('name', e.target.value)}
                            label="Task"
                            fullWidth
                            required
                        ></ManagedTextField>
                        <LoadingButton
                            color="primary"
                            onClick={onSubmit}
                            loading={loading}
                        >
                            <AddIcon />
                        </LoadingButton>
                    </Box>
                </form>
                {isSuccess && <Alert color="success">Tasks is created</Alert>}
            </ManagedForm>
        </Paper>
    );
};

export default CreateQuickTaskCard;
