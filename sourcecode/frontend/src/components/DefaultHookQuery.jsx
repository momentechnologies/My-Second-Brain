import * as React from 'react';
import getGraphqlError from '../helpers/getGraphqlError.js';
import NotFound from './NotFound.jsx';
import { Alert, Box, CircularProgress } from '@mui/material';

export default ({
    children,
    queryHookData,
    backgroundUpdate = false,
    handleNotFound = false,
}) => {
    const { loading, error, ...dataProps } = queryHookData;

    if (
        loading &&
        (!backgroundUpdate ||
            dataProps.data == null ||
            Object.keys(dataProps.data).length === 0)
    ) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        const parsedError = getGraphqlError(error);

        if (handleNotFound && parsedError.type === 'not_found') {
            return <NotFound />;
        }

        return <Alert color="error">Something happened</Alert>;
    }

    return children(dataProps);
};
