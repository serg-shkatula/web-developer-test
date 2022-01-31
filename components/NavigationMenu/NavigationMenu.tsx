import React, { useMemo } from 'react';
import { Box, Button, IconButton, SxProps } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import Link from 'next/link';
import Image from 'next/image';

const classes: SxProps = {
  root: {
    color: 'black',
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
    paddingInlineStart: 3,
    '& li': {
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
};

const NavigationMenu: React.FC<Props> = ({ sx = {}, vertical }) => {
  const renderedMenuItems = useMemo(
    () =>
      menuItems.map((item) => (
        <Link key={item.id} href={item.href}>
          {(!vertical && item.customRenderHorizontal?.(item)) || (
            <Button component={'li'} color={'inherit'}>
              {item.label}
            </Button>
          )}
        </Link>
      )),
    [vertical],
  );
  return (
    <Box component={'nav'} sx={[classes.root, sx]}>
      <Box component={'ul'} sx={[{ rowGap: 1.5 }, vertical ? classes.vertical : {}]}>
        {renderedMenuItems}
      </Box>
    </Box>
  );
};

export default NavigationMenu;
