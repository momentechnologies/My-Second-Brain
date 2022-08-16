import React from 'react';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Stack,
    TextField,
} from '@mui/material';
import { useArrayV2 } from 'moment-hooks';
import { ManagedForm, ManagedTextField } from '../../../components/ManagedForm';

const ProjectForm = ({ defaultValues, onSubmit, onClose, error }) => {
    const isCreating = !defaultValues;

    const [values, setValues] = React.useState(
        defaultValues || {
            name: '',
            status: 'todo',
        }
    );

    const setValue = (key, value) =>
        setValues({
            ...values,
            [key]: value,
        });

    const tags = useArrayV2(defaultValues ? defaultValues.tags : []);

    return (
        <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>
                {isCreating ? 'Create project' : 'Update project'}
            </DialogTitle>
            <DialogContent>
                <ManagedForm error={error}>
                    <Stack spacing={2}>
                        <Box p={1} />
                        <ManagedTextField
                            inputKey="name"
                            value={values.name}
                            onChange={(e) => setValue('name', e.target.value)}
                            label="Name"
                            fullWidth
                            required
                        />
                        <ManagedTextField
                            inputKey="status"
                            value={values.status}
                            onChange={(e) => setValue('status', e.target.value)}
                            label="Status"
                            fullWidth
                            required
                            select
                        >
                            {[
                                { value: 'todo', label: 'To-do' },
                                { value: 'doing', label: 'Doing' },
                            ].map(({ value, label }) => (
                                <MenuItem key={value} value={value}>
                                    {label}
                                </MenuItem>
                            ))}
                        </ManagedTextField>
                        {error && <Alert color="error">{error.message}</Alert>}
                    </Stack>
                </ManagedForm>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={() => onSubmit({ ...values, tags: tags.value })}
                >
                    {isCreating ? 'Create' : 'Update'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const Wrapper = ({ isOpen, ...props }) => {
    if (isOpen) {
        return <ProjectForm {...props} />;
    }

    return <></>;
};

export default Wrapper;
