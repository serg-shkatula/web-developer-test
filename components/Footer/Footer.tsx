import React from 'react';
import Image from 'next/image';
import { Box, ButtonBase, Link, Toolbar, Typography } from '@mui/material';
import NavigationMenu from '../NavigationMenu';

const classes = {
  root: {
    pt: 5,
    pb: 5,
    borderTop: '1px solid rgba(0,0,0,0.05)',
  },
  nav: {
    color: 'black',
  },
  basketButton: {
    marginLeft: 1,
  },
};

const socialMediaLinks = [
  { href: 'https://plus.google.com', iconUrl: '/images/icon_google-plus.svg', alt: 'google plus' },
  { href: 'https://facebook.com', iconUrl: '/images/icon_facebook.svg', alt: 'facebook' },
  { href: 'https://instagram.com', iconUrl: '/images/icon_instagram.svg', alt: 'instagram' },
  { href: 'https://twitter.com', iconUrl: '/images/icon_twitter.svg', alt: 'twitter' },
];

const Footer: React.FC = () => {
  return (
    <Toolbar component={'footer'} sx={classes.root} color={'default'} style={{ minHeight: 'auto' }}>
      <Image src={'/images/logo.svg'} alt="logo" width={60} height={20} />
      <NavigationMenu sx={classes.nav} vertical />
      <Box textAlign={'right'} marginLeft={'auto'}>
        <Box sx={{ opacity: 0.54, marginBottom: 1, display: 'flex', gap: 3 }}>
          {socialMediaLinks.map((l) => (
            <Link key={l.href} component={ButtonBase} href={l.href} target={'_blank'}>
              <Image src={l.iconUrl} alt={l.alt} width={48} height={48} />
            </Link>
          ))}
        </Box>
        <Typography>
          <a href={'#'}>Privacy Policy</a>
          <br />© 2017 Google. All Rights Reserved
        </Typography>
      </Box>
    </Toolbar>
  );
};

export default Footer;
