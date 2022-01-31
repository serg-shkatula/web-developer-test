import React from 'react';
import { ButtonBase, Toolbar } from '@mui/material';
import NavigationMenu from '../NavigationMenu';
import Link from 'next/link';
import Image from 'next/image';

const classes = {
  root: {
    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.25)',
    pt: 3,
    pb: 3,
  },
  nav: {
    marginLeft: 'auto',
  },
};

const Header: React.FC = () => {
  return (
    <Toolbar component={'header'} sx={classes.root} color={'default'}>
      <Link href={'/'} passHref>
        <ButtonBase sx={{ p: 2, m: -2 }}>
          <Image src={'/images/logo.svg'} alt="logo" width={60} height={20} />
        </ButtonBase>
      </Link>
      <NavigationMenu sx={classes.nav} />
    </Toolbar>
  );
};

export default Header;
