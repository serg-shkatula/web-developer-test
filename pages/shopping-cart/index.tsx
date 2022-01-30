import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Box, BoxProps, Button, Container, Icon, IconButton, Tooltip, Typography } from '@mui/material';
import Section from '../../components/Section';
import AppFrame from '../../components/AppFrame';
import products from '../../api/products/index.json';
import { SystemStyleObject } from '@mui/system';
import Quantity from '../../components/Quantity';
import { calculateCost, createProductItemRemover, createProductItemUpdater, toPrice } from '../../functions';
import { ProductItem, ClientProductItem } from '../../types';

const VAT_PERCENT = 19;

type Column = {
  id: string;
  label?: string;
  width?: string;
  flex?: BoxProps['flex'];
  align?: 'right' | 'center';
};

type ShoppingCartProps = {
  items: ProductItem[];
};

const classes = {
  root: {
    //
  },
  section: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 647,
  },
  table: {
    m: -0.5,
  },
  title: {
    '&:not(:last-child)': {
      mb: 1,
    },
  },
};

const columns: Column[] = [
  { id: 'product', label: 'Product', flex: 1 },
  { id: 'price', label: 'Price', width: '10%', align: 'right' },
  { id: 'quantity', label: 'Quantity', width: '30%', align: 'center' },
  { id: 'cost', label: 'Cost', width: '12%', align: 'right' },
  { id: 'action', width: '8%', align: 'right' },
];
const header = columns.map((c) => (
  <Typography key={c.id} sx={{ fontWeight: 500 }}>
    {c.label}
  </Typography>
));

const Row: React.FC<{ sx?: SystemStyleObject; columnsInfo: Column[]; cells: React.ReactNode[] }> = ({
  sx,
  columnsInfo,
  cells,
}) => {
  return (
    <Box sx={[sx ? sx : {}, { display: 'flex', alignItems: 'center', pt: 1, pb: 1 }]}>
      {columnsInfo.map((cell, i) => (
        <Box key={cell.id} sx={{ width: cell.width, textAlign: cell.align, flex: cell.flex, pl: 0.5, pr: 0.5 }}>
          {['number', 'string'].includes(typeof cells[i]) ? <Typography>{cells[i]}</Typography> : cells[i]}
        </Box>
      ))}
    </Box>
  );
};

const UpdatedStockWarningIcon = () => (
  <Tooltip title={'Quantity was updated due to reduced stock'}>
    <Icon color={'warning'} className={'material-icons-round'} sx={{ fontSize: 'inherit !important', mb: -0.25 }}>
      report_problem
    </Icon>
  </Tooltip>
);

const ShoppingCart: NextPage<ShoppingCartProps> = ({ items: originalItems }) => {
  const [editedItems, setEditedItems] = useState<ClientProductItem[]>(() => {
    return originalItems.map((item) => ({
      ...item,
      cost: calculateCost(item),
      quantity: Math.min(item.stockLevel, item.quantity),
      originalQuantity: item.quantity,
    }));
  });
  const [totalInfo, setTotalInfo] = useState({ subTotal: 0, vat: 0, total: 0, itemsTotal: 0 });

  useEffect(() => {
    const itemsTotal = editedItems.reduce((res, item) => res + item.quantity, 0);
    const subTotal = editedItems.reduce((res, item) => res + item.cost, 0);
    const vat = (subTotal * VAT_PERCENT) / 100;
    setTotalInfo({
      itemsTotal,
      subTotal,
      vat,
      total: subTotal + vat,
    });
  }, [editedItems]);

  const updateQuantity = useCallback((sku: string, quantity: number) => {
    setEditedItems(createProductItemUpdater(sku, quantity));
  }, []);

  const removeItem = useCallback((sku: string) => {
    setEditedItems(createProductItemRemover(sku));
  }, []);

  const itemsAsRows = useMemo(
    () =>
      editedItems.map((item) => {
        const outOfStock = item.stockLevel == 0;
        const stockExceeded = !outOfStock && item.originalQuantity > item.stockLevel;
        return (
          <Row
            key={item.sku}
            columnsInfo={columns}
            sx={outOfStock ? { color: 'error.main' } : undefined}
            cells={[
              <Typography key={'name'}>
                {stockExceeded && (
                  <>
                    <UpdatedStockWarningIcon />{' '}
                  </>
                )}
                {item.name}
                {item.size ? ', ' + item.size : ''}
              </Typography>,
              <Typography key={'price'}>{toPrice(item.price)}</Typography>,
              outOfStock ? (
                <Typography>out of stock</Typography>
              ) : (
                <Quantity
                  key={'quantity'}
                  max={item.stockLevel}
                  value={item.quantity}
                  onUpdate={(val) => updateQuantity(item.sku, val)}
                />
              ),
              <Typography key={'cost'}>{toPrice(item.cost)}</Typography>,
              <IconButton key={'action'} sx={{ m: -1 }} onClick={() => removeItem(item.sku)}>
                <Image src={'/images/icon_trash.svg'} width={18} height={20} alt="delete" />
              </IconButton>,
            ]}
          />
        );
      }),
    [editedItems, updateQuantity, removeItem],
  );

  return (
    <AppFrame title={'Your Basket'}>
      <Section sx={classes.section}>
        <Container sx={classes.container}>
          <Box sx={classes.content}>
            <Box mb={4}>
              <Typography variant={'h3'} sx={classes.title}>
                Your Basket
              </Typography>
              <Typography>
                {!editedItems.length
                  ? '... is empty 🤷‍♂️'
                  : 'Items you have added to your basket are shown below. Adjust the quantities or remove items beforecontinuing purchase.'}
              </Typography>
            </Box>
            {!!editedItems.length && (
              <Box sx={classes.table}>
                <Row columnsInfo={columns} cells={header} />
                <Box sx={{ height: 2, backgroundColor: '#EFEFEF', ml: 0.5, mr: 0.5 }} />
                {itemsAsRows}
                {!!totalInfo.itemsTotal && (
                  <>
                    <Row columnsInfo={columns} cells={['Subtotal', , , toPrice(totalInfo.subTotal)]} sx={{ mt: 2 }} />
                    <Row columnsInfo={columns} cells={[`VAT at ${VAT_PERCENT}%`, , , toPrice(totalInfo.vat)]} />
                    <Row columnsInfo={columns} cells={['Total cost', , , toPrice(totalInfo.total)]} />
                    <Row
                      columnsInfo={[...columns.slice(0, -2), { ...columns[3], width: undefined }, columns[4]]}
                      sx={{ mt: 2 }}
                      cells={[
                        ,
                        ,
                        ,
                        // eslint-disable-next-line react/jsx-key
                        <Link href={'/checkout'} passHref>
                          <Button variant={'contained'}>Buy Now</Button>
                        </Link>,
                      ]}
                    />
                  </>
                )}
              </Box>
            )}
          </Box>
        </Container>
      </Section>
    </AppFrame>
  );
};

export const getServerSideProps: GetServerSideProps<ShoppingCartProps> = async () => {
  return { props: { items: products.items } };
};

export default ShoppingCart;
