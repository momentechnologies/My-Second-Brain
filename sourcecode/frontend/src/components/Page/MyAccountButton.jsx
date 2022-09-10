import React from 'react';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { IconButton, Popover } from '@mui/material';
import MyAccountPopover from './MyAccountPopover';

const MyAccountButton = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton onClick={handleClick}>
                <AccountCircleIcon
                    fontSize={'large'}
                    sx={{
                        color: 'primary.contrastText',
                    }}
                />
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <MyAccountPopover />
            </Popover>
        </>
    );
};

export default MyAccountButton;
