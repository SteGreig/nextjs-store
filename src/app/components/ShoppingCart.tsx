"use client";

import { ShoppingCartIcon, XIcon } from "lucide-react";
import Image from "next/image";
import formatPrice from "../helpers/formatPrice";

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
        className={`w-11/12 max-w-96 bg-white fixed top-0 right-0 h-screen p-4 transition-all z-20 overflow-y-auto ${
          isOpen ? "cart-open translate-x-0 shadow-2xl" : "translate-x-full"
        }`}
      >
        <div className="flex gap-2 flex-col">
          <div className="flex justify-between items-center w-full mb-2">
            <h3 className="font-light text-xl">Your Shopping Basket</h3>
            <button
              aria-label="Close Basket"
              className="p-2 rounded-full hover:bg-gray-200 transition duration-200"
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
            >
              <XIcon />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {cart.products.map((product) => (
              <article
                key={product.id}
                className="flex items-start gap-3 p-4 border border-gray-300 rounded-xl"
              >
                <Image
                  src={product.thumbnail}
                  width="60"
                  height="60"
                  alt={product.title}
                  className="rounded"
                />
                <div className="text-sm">
                  <h4 className="font-semibold leading-snug text-base mb-1">
                    {product.title}
                  </h4>
                  <p className="text-gray-600">{formatPrice(product.price)}</p>
                  <p className="text-gray-600">Quantity: {product.quantity}</p>
                  <p className="font-semibold mt-1">
                    Total: {formatPrice(product.total)}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="leading-none my-4 grid gap-3 text-gray-600">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(cart.total)}</span>
            </p>
            <p className="flex justify-between">
              <span>Discounts</span>
              <span>-{formatPrice(cart.total - cart.discountedTotal)}</span>
            </p>
            <p className="flex justify-between font-semibold border-t border-gray-300 text-black text-lg py-4 mt-2">
              <span>Order Total</span>
              <span>{formatPrice(cart.discountedTotal)}</span>
            </p>
            {/* <p>
              <span>Total Products:</span> {cart.totalProducts}
            </p>
            <p>
              <span>Total Quantity:</span> {cart.totalQuantity}
            </p> */}
            <button className="btn btn--lg w-full" tabIndex={isOpen ? 0 : -1}>
              Checkout
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="bg-black/50 fixed top-0 right-0 h-screen w-screen z-10"
        />
      )}
    </>
  );
};

export const ShoppingCartButton = ({ cartCount }: { cartCount: number }) => {
  const { setIsOpen } = useShoppingCart();

  return (
    <button
      className="btn btn--outline relative"
      onClick={() => setIsOpen(true)}
    >
      <ShoppingCartIcon />
      <span className="ml-1">Basket</span>
      <span className="w-5 aspect-square rounded-full text-xs absolute -top-2 -right-2 flex items-center justify-center bg-purple-700 text-white shadow-lg">
        {cartCount}
      </span>
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
