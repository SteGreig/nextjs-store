"use client";

import { Product as ProductType } from "../types/Product";
import { useShoppingCart } from "./ShoppingCart";
import { PlusIcon } from "lucide-react";

type Props = {
  product: ProductType;
};

export const AddToBasket = ({ product }: Props) => {
  const { addToCart, setIsOpen } = useShoppingCart();

  const handleAddToCartClick = (product: ProductType) => {
    addToCart(product);
    setIsOpen(true);
  };
  return (
    <button
      className="btn btn--outline"
      onClick={() => handleAddToCartClick(product)}
    >
      <span>Add to basket</span>
      <PlusIcon />
    </button>
  );
};
