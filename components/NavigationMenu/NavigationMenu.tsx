import React, { useMemo } from 'react';
import { Box, Button, ButtonBase, IconButton, SxProps, Typography } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import Link from 'next/link';
import Image from 'next/image';

const classes: SxProps = {
  root: {
    rowGap: 1.5,
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
    '& a': {
      justifyContent: 'start',
    },
  },
  basketButton: {
    marginLeft: 1,
    marginRight: -1,
  },
};

type MenuItem = {
  id: string;
  href: string;
  label: string;
  customRenderHorizontal?: (props: MenuItem) => React.ReactNode;
};

const menuItems: MenuItem[] = [
  { id: 'products', href: '/products', label: 'Products' },
  { id: 'news', href: '/news', label: 'News' },
  { id: 'contact', href: '/contact', label: 'Contact' },
  {
    id: 'shopping-cart',
    href: '/shopping-cart',
    label: 'Your Basket',
    customRenderHorizontal: () => (
      <IconButton sx={classes.basketButton}>
        <Image src={'/images/shopping_cart.svg'} width={20} height={20} alt="shopping cart" />
      </IconButton>
    ),
  },
];

type Props = {
  sx?: SystemStyleObject;
  vertical?: boolean;
  asBurger?: boolean;
};

const NavigationMenu: React.FC<Props> = ({ sx = {}, vertical, asBurger }) => {
  const renderedMenuItems = useMemo(
    () =>
      menuItems.map((item) => (
        <Link key={item.id} href={item.href} passHref>
          {(!vertical && item.customRenderHorizontal?.(item)) || (
            <Button component={'a'} color={'inherit'}>
              {item.label}
            </Button>
          )}
        </Link>
      )),
    [vertical],
  );
  return (
    <Box component={'nav'} sx={[classes.root, sx, vertical ? classes.vertical : {}]}>
      {asBurger ? (
        <ButtonBase>
          <Typography variant={'caption'} mr={2} fontWeight={400}>
            MENU
          </Typography>
          <img src={'/images/icon_menu.svg'} alt="menu" width={16} height={14} style={{ opacity: 0.54 }} />
        </ButtonBase>
      ) : (
        renderedMenuItems
      )}
    </Box>
  );
};

export default NavigationMenu;
