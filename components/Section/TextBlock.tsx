import { Box, Button, Typography, TypographyVariant } from '@mui/material';
import React from 'react';
import { StandardLonghandProperties } from 'csstype';
import Link from 'next/link';

const classes = {
  root: {
    p: { xs: 8, sm: 8, md: 17 },
    pl: { xs: 2.5, sm: 8, md: 16 },
    pr: { xs: 2.5, sm: 8, md: 16 },
    maxWidth: 1200,
  },
  title: {
    mb: 1,
  },
  button: {
    marginTop: {
      xs: 3,
      md: 7,
    },
  },
};

type Props = {
  caption?: string;
  title: string;
  text?: string | (() => React.ReactNode);
  isBackgroundDark?: boolean;
  textAlign?: StandardLonghandProperties['textAlign'];
  titleVariant?: TypographyVariant;
  buttonLabel?: string;
  buttonHref?: string;
};

const TextBlock: React.FC<Props> = ({
  caption,
  title,
  text,
  isBackgroundDark,
  textAlign,
  titleVariant = 'h2',
  buttonLabel,
  buttonHref,
}) => {
  return (
    <Box sx={[classes.root, isBackgroundDark ? { color: 'white' } : {}, textAlign ? { textAlign } : {}]}>
      {caption && <Typography variant={'caption'}>{caption}</Typography>}
      <Typography variant={titleVariant} sx={classes.title}>
        {title}
      </Typography>
      {text && <Typography variant={'subtitle1'}>{typeof text === 'function' ? text() : text}</Typography>}
      {buttonLabel && buttonHref && (
        <Link href={buttonHref} passHref>
          <Button sx={classes.button} variant={'contained'}>
            {buttonLabel}
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default TextBlock;
