export type ProductItem = {
  sku: string;
  name: string;
  size?: string;
  price: number;
  stockLevel: number;
  quantity: number;
};

export type ClientProductItem = ProductItem & { cost: number; originalQuantity: number };
