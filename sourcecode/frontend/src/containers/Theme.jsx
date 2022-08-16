import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

const Theme = ({ children }) => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#ff9a46',
                dark: '#ff9a46',
            },
            secondary: {
                main: '#82E066',
                dark: '#1D7105',
            },
        },
        components: {
            MuiButton: {
                defaultProps: {
                    variant: 'contained',
                },
            },
            MuiLoadingButton: {
                defaultProps: {
                    variant: 'contained',
                },
            },
        },
    });

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
