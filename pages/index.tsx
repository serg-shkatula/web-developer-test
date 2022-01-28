import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Typography } from '@mui/material';

const classes = {
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    p: 1,
    backgroundColor: '#eee',
  },
  main: {
    flex: 1,
    p: 1,
  },
  footer: {
    p: 1,
    backgroundColor: '#000',
    color: 'white',
  },
};

const Home: NextPage = () => {
  return (
    <Box sx={classes.root}>
      <Head>
        <title>APPS</title>
        <meta name="description" content="APPS demo website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>

      <Box component={'header'} sx={classes.header}>
        <Typography variant={'overline'}>header</Typography>
      </Box>

      <Box component={'main'} sx={classes.main}>
        <Typography variant={'overline'}>main</Typography>
      </Box>

      <Box component={'footer'} sx={classes.footer}>
        <Typography variant={'overline'}>footer</Typography>
      </Box>
    </Box>
  );
};

export default Home;
