import React from 'react';
import { Box } from '@mui/material';

const PageContent = ({ title, children }) => {
    return (
        <Box
            p={2}
            flex={1}
            sx={{
                overflowY: 'auto',
            }}
        >
            <h1>{title}</h1>
            {children}
        </Box>
    );
};

export default PageContent;
