import React from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import {
    Inbox as InboxIcon,
    Folder as FolderIcon,
    AddTask as AddTaskIcon,
    Today as TodayIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import MyAccountButton from './MyAccountButton';
import { LogoWhite } from '../CustomIcons';
import { useMatch } from 'react-router-dom';

const MenuIcon = ({ path, Icon, selectedColor, color, iconSize }) => {
    const match = useMatch({
        path: path,
        strict: true,
        sensitive: true,
    });

    return (
        <Icon
            fontSize={iconSize}
            sx={{
                color: !!match ? selectedColor : color,
            }}
        ></Icon>
    );
};

const _links = (
    iconSize = 'medium',
    color = 'primary.contrastText',
    selectedColor = 'tertiary.main'
) => [
    {
        to: '/app',
        icon: (
            <MenuIcon
                path={'/app'}
                Icon={TodayIcon}
                color={color}
                selectedColor={selectedColor}
                iconSize={iconSize}
            />
        ),
    },
    {
        to: '/app/process',
        icon: (
            <MenuIcon
                path={'/app/process'}
                Icon={InboxIcon}
                color={color}
                selectedColor={selectedColor}
                iconSize={iconSize}
            />
        ),
    },
    {
        to: '/app/projects',
        icon: (
            <MenuIcon
                path={'/app/projects'}
                Icon={AddTaskIcon}
                color={color}
                selectedColor={selectedColor}
                iconSize={iconSize}
            />
        ),
    },
    {
        to: '/app/nodes',
        icon: (
            <MenuIcon
                path={'/app/nodes'}
                Icon={FolderIcon}
                color={color}
                selectedColor={selectedColor}
                iconSize={iconSize}
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
                        <LogoWhite />
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
