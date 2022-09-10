import React from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import {
    Inbox as InboxIcon,
    Folder as FolderIcon,
    ReceiptLong as ReceiptLongIcon,
    AddTask as AddTaskIcon,
    Today as TodayIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import MyAccountButton from './MyAccountButton';

const _links = (iconSize = 'medium', color = 'primary.contrastText') => [
    {
        to: '/app',
        icon: (
            <InboxIcon
                fontSize={iconSize}
                sx={{
                    color,
                }}
            />
        ),
    },
    {
        to: '/app/my-day',
        icon: (
            <TodayIcon
                fontSize={iconSize}
                sx={{
                    color,
                }}
            />
        ),
    },
    {
        to: '/app/projects',
        icon: (
            <AddTaskIcon
                fontSize={iconSize}
                sx={{
                    color,
                }}
            />
        ),
    },
    {
        to: '/app/process',
        icon: (
            <ReceiptLongIcon
                fontSize={iconSize}
                sx={{
                    color,
                }}
            />
        ),
    },
    {
        to: '/app/nodes',
        icon: (
            <FolderIcon
                fontSize={iconSize}
                sx={{
                    color,
                }}
            />
        ),
    },
];

const Page = ({ children }) => {
    const links = _links();
    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
            }}
            display={'flex'}
        >
            <Stack
                justifyContent={'space-between'}
                sx={{
                    backgroundColor: 'primary.main',
                }}
            >
                <Stack spacing={1} pt={2}>
                    <Stack
                        flexDirection={'row'}
                        justifyContent={'center'}
                        sx={{
                            color: 'primary.contrastText',
                        }}
                        pb={3}
                    >
                        MSB
                    </Stack>
                    {links.map((link, index) => (
                        <Stack
                            key={index}
                            flexDirection={'row'}
                            justifyContent={'center'}
                        >
                            <IconButton component={Link} to={link.to}>
                                {link.icon}
                            </IconButton>
                        </Stack>
                    ))}
                </Stack>
                <Box>
                    <Stack flexDirection={'row'} justifyContent={'center'}>
                        <MyAccountButton />
                    </Stack>
                </Box>
            </Stack>
            {children}
        </Box>
    );
};

export default Page;
