import { Grid, GridProps } from '@mui/material';
import React from 'react';
import { SystemStyleObject } from '@mui/system';

const classes = {
  root: {
    display: 'flex',
    height: 'auto',
  },
  square: {
    position: 'relative',
    paddingBottom: '50%',
  },
};

const SectionColumn: React.FC<{
  sx?: SystemStyleObject;
  xs?: GridProps['xs'];
  alignItems?: 'center';
  justifyContent?: 'center';
  square?: boolean;
}> = ({ children, sx, xs = 12, alignItems, justifyContent, square }) => {
  return (
    <Grid sx={[classes.root, { alignItems, justifyContent, ...sx }, square ? classes.square : {}]} item xs={xs}>
      {children}
    </Grid>
  );
};

export default SectionColumn;
