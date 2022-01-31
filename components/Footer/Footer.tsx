import React from 'react';
import Image from 'next/image';
import { Box, ButtonBase, Link, Typography } from '@mui/material';
import NavigationMenu from '../NavigationMenu';

const classes = {
  root: {
    '&': {
      xs: {},
      sm: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    p: { xs: 3, sm: 6 },
    pt: { xs: 5, sm: 5 },
    pb: { xs: 5, sm: 5 },
    borderTop: '1px solid rgba(0,0,0,0.05)',
  },
  nav: {
    color: 'black',
    ml: {
      xs: -2,
      sm: 3,
    },
    mt: {
      xs: 3,
      sm: 0,
    },
    mb: {
      xs: 5,
      sm: 0,
    },
  },
  basketButton: {
    marginLeft: 1,
  },
  socialLinks: {
    opacity: 0.54,
    marginBottom: { xs: 3, sm: 1 },
    maxWidth: { xs: 180, sm: 'unset' },
    display: 'flex',
    gap: 3,
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
    <Box component={'footer'} sx={classes.root} color={'default'} style={{ minHeight: 'auto' }}>
      <Image src={'/images/logo.svg'} alt="logo" width={60} height={20} />
      <NavigationMenu sx={classes.nav} vertical />
      <Box textAlign={{ xs: 'unset', sm: 'right' }} marginLeft={'auto'}>
        <Box sx={classes.socialLinks}>
          {socialMediaLinks.map((l) => (
            <Link key={l.href} component={ButtonBase} href={l.href} target={'_blank'}>
              <Image src={l.iconUrl} alt={l.alt} width={48} height={48} />
            </Link>
          ))}
        </Box>
        <Typography variant={'caption'}>
          <a href={'#'}>Privacy Policy</a>
          <br />© 2017 Google. All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
