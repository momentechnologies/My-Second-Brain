import React from 'react';
import {
    AppBar,
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';

const Header = () => {
    const navigate = useNavigate();
    const [menuIsOpen, setMenuIsOpen] = React.useState(false);

    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        onClick={() => setMenuIsOpen(!menuIsOpen)}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
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
                        onClick={() => navigate('/auth/signup')}
                        sx={{ my: 2, display: 'block' }}
                    >
                        Start free 14 days trial
                    </Button>
                    <Button
                        variant={'text'}
                        onClick={() => navigate('/auth/login')}
                        sx={{ my: 2, ml: 2, display: 'block' }}
                    >
                        Login
                    </Button>
                </Box>
            </Toolbar>
            <Box
                sx={{
                    flexGrow: 1,
                    display: { xs: menuIsOpen ? 'flex' : 'none', md: 'none' },
                    bgcolor: 'white',
                }}
            >
                <List sx={{ width: '100%' }}>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/auth/login')}>
                            <ListItemText primary="Login" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <Button component={Link} to="/auth/signup">
                            Start for free
                        </Button>
                    </ListItem>
                </List>
            </Box>
        </AppBar>
    );
};

export default Header;
