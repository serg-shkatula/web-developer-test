import React from 'react';
import Image from 'next/image';
import { Box, ButtonBase, InputBase, Tooltip } from '@mui/material';

const classes = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: 80,
    height: 28,
    margin: 'auto',
    border: '1px solid',
    borderColor: 'primary.main',
    borderRadius: '3px',
  },
  button: {
    width: 26,
  },
  disabled: {
    opacity: 0.3,
  },
};

type Props = {
  max?: number;
  value: number;
  onUpdate: (value: number) => void;
};

const Quantity: React.FC<Props> = ({ max, value = 0, onUpdate }) => {
  const disabled = max === 0;
  const isSubtractDisabled = value <= 0 || disabled;
  const isAddDisabled = value >= (max !== undefined ? max : Infinity) || disabled;
  const subtractButton = (
    <ButtonBase
      sx={[classes.button, isSubtractDisabled ? classes.disabled : {}]}
      onClick={isSubtractDisabled ? undefined : () => onUpdate(Math.max(value - 1, 0))}
    >
      <Image src="/images/minus.svg" alt="subtract" width={5} height={1} />
    </ButtonBase>
  );
  let addButton = (
    <ButtonBase
      sx={[classes.button, isAddDisabled ? classes.disabled : {}]}
      onClick={
        isAddDisabled
          ? undefined
          : () => {
              console.log(value, max);
              onUpdate(Math.min(value + 1, max || 0));
            }
      }
    >
      <Image src="/images/plus.svg" alt="add" width={7} height={7} />
    </ButtonBase>
  );
  if (isAddDisabled) {
    addButton = <Tooltip title={'no more items in stock'}>{addButton}</Tooltip>;
  }
  return (
    <Box sx={classes.root}>
      {subtractButton}
      <InputBase
        value={value}
        size={'small'}
        color={'primary'}
        type={'number'}
        sx={{ flex: 1, mb: '1px' }}
        inputProps={{
          sx: { textAlign: 'center', p: 0 },
          min: 0,
          max,
        }}
      />
      {addButton}
    </Box>
  );
};

export default Quantity;
