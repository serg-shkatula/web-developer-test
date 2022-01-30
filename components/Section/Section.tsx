import React from 'react';
import { Grid, SxProps } from '@mui/material';
import { SystemStyleObject } from '@mui/system';

const classes = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
};

type Props = {
  sx?: SystemStyleObject;
  backgroundImage?: string;
  backgroundColor?: string;
  fitHeight?: boolean;
};

const Section: React.FC<Props> = ({ children, sx = {}, backgroundColor, backgroundImage, fitHeight }) => {
  const backgroundStyle: SxProps | undefined = backgroundImage
    ? {
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined;

  return (
    <Grid
      component={'section'}
      container
      sx={[
        classes.root,
        {
          ...backgroundStyle,
          backgroundColor,
          minHeight: fitHeight ? '100%' : undefined,
          ...sx,
        },
      ]}
    >
      {children}
      {}
    </Grid>
  );
};

export default Section;
