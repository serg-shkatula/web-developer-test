import React from 'react';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import Head from 'next/head';
import Header from '../Header';
import Footer from '../Footer';

const defaultTheme = createTheme();
const theme = createTheme({
  palette: {
    primary: {
      main: '#448AFF',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        inputSizeSmall: {
          '&[type=number]': {
            '-moz-appearance': 'textfield',
          },
          '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
          '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        text: {
          paddingLeft: defaultTheme.spacing(2),
          paddingRight: defaultTheme.spacing(2),
        },
      },
    },
  },
  typography: {
    allVariants: {
      opacity: 0.87,
      fontFamily: "'Libre Franklin', sans-serif",
      fontWeight: 200,
    },
    button: {
      fontSize: 12,
    },
    h1: {
      opacity: 'unset',
      fontSize: 45,
    },
    h2: {
      opacity: 0.54,
      fontSize: 34,
    },
    h3: {
      fontSize: 24,
    },
    body1: {
      fontSize: 14,
    },
    subtitle1: {
      fontSize: 16,
    },
  },
});

const classes = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column' },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflowY: 'auto',
  },
};

type Props = {
  title?: string;
  description?: string;
};

const AppFrame: React.FC<Props> = ({ children, title, description }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Head>
          <title>
            APPS{title ? ' - ' : ''}
            {title}
          </title>
          <meta name="description" content={description} />
        </Head>

        <Box sx={classes.container}>
          <Header sx={{ zIndex: 1 }} />
          <Box component={'main'} sx={classes.main}>
            {children}
            <Footer />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AppFrame;
