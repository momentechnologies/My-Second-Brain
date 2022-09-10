import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

const Theme = ({ children }) => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#024059',
                dark: '#024059',
            },
            secondary: {
                main: '#84C1D9',
                dark: '#84C1D9',
            },
            tertiary: {
                main: '#02731E',
                dark: '#02731E',
                contrastText: '#fff',
            },
            quaternary: {
                main: '#014011',
                dark: '#014011',
            },
            quinary: {
                main: '#A65E44',
                dark: '#A65E44',
            },
        },
        components: {
            MuiButton: {
                defaultProps: {
                    variant: 'contained',
                    color: 'tertiary',
                },
            },
            MuiLoadingButton: {
                defaultProps: {
                    variant: 'contained',
                    color: 'tertiary',
                },
            },
        },
    });

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
