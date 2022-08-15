import React from 'react';
import { TextField } from '@mui/material';
import ManagedFormControl from './ManagedFormControl';

const ManagedTextField = ({ inputKey, ...props }) => {
    return (
        <ManagedFormControl inputKey={inputKey}>
            {(hasErrors) => <TextField {...props} error={hasErrors} />}
        </ManagedFormControl>
    );
};

export default ManagedTextField;
