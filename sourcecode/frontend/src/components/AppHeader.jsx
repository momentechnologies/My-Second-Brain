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
    Toolbar,
    Typography,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const AppHeader = () => {
    const navigate = useNavigate();
    const [menuIsOpen, setMenuIsOpen] = React.useState(false);
    const links = [
        {
            label: 'Projects',
            path: '/app/projects',
        },
    ];

    return (
        <AppBar position="static">
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component={Link}
                    to="/app"
                    sx={{
                        ml: 2,
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
                    component="a"
                    href="/app"
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
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
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        flexGrow: 1,
                        mr: 2,
                    }}
                    justifyContent="end"
                >
                    {links.map(({ label, path }) => (
                        <Button
                            key={label}
                            onClick={() => navigate(path)}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            variant="text"
                        >
                            {label}
                        </Button>
                    ))}
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
                    {links.map(({ label, path }) => (
                        <ListItem disablePadding key={path}>
                            <ListItemButton onClick={() => navigate(path)}>
                                <ListItemText primary={label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </AppBar>
    );
};

export default AppHeader;
