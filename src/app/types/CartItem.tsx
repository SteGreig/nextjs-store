import { Product as ProductType } from "../types/Product";

export type CartItem = {
  product: ProductType;
  quantity: number;
};
