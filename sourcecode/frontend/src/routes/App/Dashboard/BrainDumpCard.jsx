import React from 'react';
import { Box, Paper } from '@mui/material';
import ManagedTextField from '../../../components/ManagedForm/ManagedTextField';

const BrainDumpCard = () => {
    const [values, setValues] = React.useState({
        name: '',
    });
    const setValue = (key, value) =>
        setValues({
            ...values,
            [key]: value,
        });

    return (
        <Paper component={Box} p={2} mt={2}>
            <h2>Brain dump</h2>
            <ManagedTextField
                inputKey="name"
                value={values.email}
                onChange={(e) => setValue('email', e.target.value)}
                label="To-do item to dump"
                fullWidth
                required
            ></ManagedTextField>
        </Paper>
    );
};

export default BrainDumpCard;
