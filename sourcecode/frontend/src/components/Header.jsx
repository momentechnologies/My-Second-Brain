import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        mr: 2,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        textDecoration: 'none',
                        flexGrow: 1,
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate('/')}
                >
                    My Second Brain
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Button
                        onClick={() => navigate('/signup')}
                        sx={{ my: 2, display: 'block' }}
                    >
                        Start for free
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
