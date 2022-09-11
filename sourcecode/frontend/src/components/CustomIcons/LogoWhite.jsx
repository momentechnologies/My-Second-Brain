import React from 'react';
import { ReactComponent as LogoWhiteIcon } from './files/logo_white.svg';
import { SvgIcon } from '@mui/material';

const LogoWhite = () => {
    return <SvgIcon component={LogoWhiteIcon} inheritViewBox />;
};

export default LogoWhite;
