import type { Cart } from './ShoppingCart';

export const fetchCart = async (): Promise<Cart> => {
  const response = await fetch(`https://dummyjson.com/carts/1`);
  const cart = await response.json();

  return cart;
};
