import { ProductItem, ClientProductItem } from '../types';

export const toPrettyNumber = (num: number) => num.toLocaleString(undefined, { maximumFractionDigits: 2 });

export const toPrice = (num: number, symbol = '£') => symbol + toPrettyNumber(num);

export const calculateCost = (item: ProductItem) => item.price * Math.min(item.stockLevel, item.quantity);

export const createProductItemUpdater = (sku: string, quantity: number) => (items: ClientProductItem[]) => {
  const updatedItems = [...items];
  const indexToUpdate = updatedItems.findIndex((item) => item.sku === sku);

  if (indexToUpdate === -1) return items;

  let itemToUpdate = updatedItems[indexToUpdate];
  itemToUpdate = updatedItems[indexToUpdate] = {
    ...itemToUpdate,
    quantity: Math.min(quantity, itemToUpdate.stockLevel),
    originalQuantity: 0,
  };
  itemToUpdate.cost = calculateCost(itemToUpdate);

  return updatedItems;
};

export const createProductItemRemover = (sku: string) => (items: ClientProductItem[]) => {
  const indexToRemove = items.findIndex((item) => item.sku === sku);

  if (indexToRemove === -1) return items;

  const itemToRemove = items[indexToRemove];
  if (itemToRemove.quantity && !confirm(`Delete ${itemToRemove.quantity} x ${itemToRemove.name} from your basket?`))
    return items;

  return [...items.slice(0, indexToRemove), ...items.slice(indexToRemove + 1)];
};
