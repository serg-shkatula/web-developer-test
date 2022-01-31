import React from 'react';
import { Box, ButtonBase, useMediaQuery, useTheme } from '@mui/material';
import NavigationMenu from '../NavigationMenu';
import Link from 'next/link';
import { SystemStyleObject } from '@mui/system';

const classes = {
  root: {
    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.25)',
    display: 'flex',
    justifyContent: 'center',
    p: { xs: 3, sm: 6 },
    pt: { xs: 2, sm: 3 },
    pb: { xs: 2, sm: 3 },
  },
  nav: {
    marginLeft: 'auto',
  },
};

const Header: React.FC<{ sx?: SystemStyleObject }> = ({ sx = {} }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Box component={'header'} sx={[sx, classes.root]} color={'default'}>
      <Link href={'/'} passHref>
        <ButtonBase sx={{ p: 2, m: -2 }}>
          <img src={'/images/logo.svg'} alt="logo" height={isXs ? 14 : 20} />
        </ButtonBase>
      </Link>
      <NavigationMenu sx={classes.nav} asBurger={isXs} />
    </Box>
  );
};

export default Header;
