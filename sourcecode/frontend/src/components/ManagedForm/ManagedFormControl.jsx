import React from 'react';
import getGraphqlError from '../../helpers/getGraphqlError.js';
import managedFormContext from './managedFormContext';
import { FormControl, FormHelperText } from '@mui/material';

export const getError = (error, inputKey) => {
    if (!error) {
        return false;
    }

    const graphQlError = getGraphqlError(error);
    let actualError = error;

    if (error.type !== 'validation') {
        if (graphQlError.type === 'validation') {
            actualError = graphQlError;
        } else {
            return false;
        }
    }

    const inputErrors = actualError.error.messages.filter(
        (e) => e.key === inputKey
    );

    if (inputErrors.length === 0) {
        return false;
    }

    return inputErrors.map((ie) => ie.message);
};

export default ({ inputKey, children, otherProps }) => {
    const { error } = React.useContext(managedFormContext);
    const inputErrors = getError(error, inputKey);
    const hasErrors = !!inputErrors;
    return (
        <FormControl error={hasErrors} {...otherProps}>
            {children(hasErrors)}
            {inputErrors
                ? inputErrors.map((message, index) => (
                      <FormHelperText key={index}>{message}</FormHelperText>
                  ))
                : null}
        </FormControl>
    );
};
