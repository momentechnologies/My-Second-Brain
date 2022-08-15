import React from 'react';
import { TextField } from '@mui/material';
import ManagedFormControl from './ManagedFormControl';

const ManagedTextField = ({ inputKey, fullWidth, ...props }) => {
    return (
        <ManagedFormControl inputKey={inputKey} fullWidth={fullWidth}>
            {(hasErrors) => (
                <TextField {...props} fullWidth={fullWidth} error={hasErrors} />
            )}
        </ManagedFormControl>
    );
};

export default ManagedTextField;
