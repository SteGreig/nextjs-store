"use client";

import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";

import { createContext, useContext, useState } from "react";

export type Cart = {
  id: number;
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
  products: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
    thumbnail: string;
  }[];
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export const ShoppingCart = ({ cart }: Readonly<{ cart: Cart }>) => {
  const { isOpen, setIsOpen } = useShoppingCart();

  return (
    <>
      <div
        className={`md:w-96 bg-white fixed top-0 right-0 h-screen p-4 shadow-2xl transition-all z-20 ${
          isOpen ? "translate-x-0" : "translate-x-96"
        }`}
      >
        <div className="flex gap-2 flex-col">
          <div className="flex justify-between items-center w-full">
            <h3 className="font-bold text-xl">Your Shopping Basket</h3>
            <button className="p-2" onClick={() => setIsOpen(false)}>
              X
            </button>
          </div>
          <p>Please press checkout to checkout</p>
          <div className="divide-y-2">
            {cart.products.map((product) => (
              <article key={product.id} className="flex gap-2 p-1">
                <Image
                  src={product.thumbnail}
                  width="50"
                  height="50"
                  alt={product.title}
                />
                <div className="text-gray-400">
                  <h4 className="text-blue-500 leading-loose">
                    {product.title}
                  </h4>
                  <p>${product.price}</p>
                  <p className="font-extrabold">Quantity: {product.quantity}</p>
                  <p>Total: ${product.total}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="grid gap-8 leading-none">
            <p>Total: ${cart.total}</p>
            <p>Discounted Total: ${cart.discountedTotal}</p>
            <p>Total Products: {cart.totalProducts}</p>
            <p>Total Quantity: {cart.totalQuantity}</p>
            <button className="bg-red-900 text-red-100 p-1 w-full">
              Checkout!
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="bg-black/50 fixed top-0 right-0 h-screen w-screen z-10" />
      )}
    </>
  );
};

export const ShoppingCartButton = () => {
  const { setIsOpen } = useShoppingCart();

  return (
    <button className="btn" onClick={() => setIsOpen(true)}>
      <ShoppingCartIcon />
      <span>Basket</span>
    </button>
  );
};

type ShoppingCartState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const ShoppingCartContext = createContext<ShoppingCartState>({
  isOpen: false,
  setIsOpen: () => {},
});

export const useShoppingCart = (): ShoppingCartState =>
  useContext(ShoppingCartContext);

export const ShoppingCartProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ShoppingCartContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
