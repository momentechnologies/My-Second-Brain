import React from 'react';
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
    const navigate = useNavigate();
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        flexGrow: 1,
                    }}
                >
                    My Second Brain
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {[
                        {
                            label: 'Poles',
                            path: '/poles',
                        },
                        {
                            label: 'GPR Scans',
                            path: '/gpr-scans',
                        },
                        {
                            label: 'BV Mill scans',
                            path: '/bv-mill-scans',
                        },
                        {
                            label: 'Keys',
                            path: '/keys',
                        },
                    ].map(({ label, path }) => (
                        <Button
                            key={label}
                            onClick={() => navigate(path)}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {label}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppHeader;
