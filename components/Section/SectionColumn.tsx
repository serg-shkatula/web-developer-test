import { Box, Grid, GridProps } from '@mui/material';
import React from 'react';
import { SystemStyleObject } from '@mui/system';

const classes = {
  root: {
    display: 'flex',
    height: 'auto',
  },
  square: {
    width: '100%',
    position: 'relative',
    paddingBottom: '100%',
  },
};

const SectionColumn: React.FC<{
  sx?: SystemStyleObject;
  xs?: GridProps['xs'];
  sm?: GridProps['sm'];
  alignItems?: 'center';
  justifyContent?: 'center';
  square?: boolean;
}> = ({ children, sx, xs = 12, sm = 12, alignItems, justifyContent, square }) => {
  return (
    <Grid sx={[classes.root, { alignItems, justifyContent, ...sx }]} item xs={xs} sm={sm}>
      {children}
      {square && <Box sx={classes.square} />}
    </Grid>
  );
};

export default SectionColumn;
