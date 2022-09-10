import React from 'react';
import {
    Box,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Paper,
} from '@mui/material';
import AuthContext from '../../contexts/auth';
import LoadBillingButton from './LoadBillingButton';
import { Logout as LogoutIcon } from '@mui/icons-material';

const MyAccountPopover = () => {
    const { user, logout } = React.useContext(AuthContext);

    return (
        <Paper>
            <Box p={2}>
                <strong>Email: </strong> {user.email}
            </Box>
            <Divider />
            <Box>
                <List
                    dense
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                    }}
                    component="nav"
                    subheader={
                        <ListSubheader component="div">Account</ListSubheader>
                    }
                >
                    {user.emailConfirmed && user.hasSubscription && (
                        <LoadBillingButton />
                    )}
                    <ListItemButton onClick={() => logout()}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </List>
            </Box>
        </Paper>
    );
};

export default MyAccountPopover;
