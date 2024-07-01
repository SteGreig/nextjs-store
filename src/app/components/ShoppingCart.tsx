"use client";

import { ShoppingCartIcon, XIcon } from "lucide-react";
import Image from "next/image";
import formatPrice from "../helpers/formatPrice";
import { Product as ProductType } from "../types/Product";
import { CartItem } from "../types/CartItem";

import { createContext, useContext, useState, useEffect } from "react";

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

export const ShoppingCart = () => {
  const {
    isOpen,
    setIsOpen,
    cartItems,
    cartTotal,
    updateCartItemQuantity,
    removeFromCart,
  } = useShoppingCart();

  return (
    <>
      <div
        className={`w-11/12 max-w-96 bg-white fixed top-0 right-0 h-screen p-4 transition-all z-40 overflow-y-auto ${
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
            {cartItems.map((item: CartItem) => {
              const changeQuantity = (newQty: number) => {
                if (newQty >= 1) {
                  updateCartItemQuantity(item.product.id, newQty);
                }
              };

              const handleRemoveItem = (productID: number) => {
                removeFromCart(productID);
              };

              return (
                <article
                  key={item.product.id}
                  className="flex items-start gap-3 p-4 border border-gray-300 rounded-xl relative"
                >
                  <Image
                    src={item.product.images[0]}
                    width="60"
                    height="60"
                    alt={item.product.title}
                    className="rounded"
                  />
                  <div className="text-sm pr-5">
                    <h4 className="font-semibold leading-snug text-base mb-1">
                      {item.product.title}
                    </h4>
                    <p className="text-gray-600">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="flex gap-1 mt-2">
                      <button
                        className="btn btn--outline h-6 w-6"
                        onClick={() => changeQuantity(item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="w-6 border border-gray-600 text-gray-600 rounded flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button
                        className="btn btn--outline h-6 w-6"
                        onClick={() => changeQuantity(item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold mt-2">
                      Total: {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                  <button
                    className="absolute top-1 right-1 p-1 rounded-full hover:bg-gray-200 transition duration-200 text-lg"
                    onClick={() => handleRemoveItem(item.product.id)}
                  >
                    <XIcon className="w-[1em] h-[1em]" />
                  </button>
                </article>
              );
            })}
          </div>
          <div className="leading-none my-4 grid gap-3 text-gray-600">
            {/* <p className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </p> */}
            {/* <p className="flex justify-between">
              <span>Discounts</span>
              <span>-{formatPrice(cart.total - cart.discountedTotal)}</span>
            </p> */}
            <p className="flex justify-between font-semibold border-t border-gray-300 text-black text-lg py-4 mt-2">
              <span>Order Total</span>
              <span>{formatPrice(cartTotal)}</span>
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
      <div
        onClick={() => setIsOpen(false)}
        className={`bg-black/60 fixed top-0 right-0 h-screen w-screen z-30 transition ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
    </>
  );
};

export const ShoppingCartButton = () => {
  const { setIsOpen, cartCount } = useShoppingCart();

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
  cartItems: CartItem[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
};

export const ShoppingCartContext = createContext<ShoppingCartState>({
  isOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  cartTotal: 0,
  cartCount: 0,
});

export const useShoppingCart = (): ShoppingCartState =>
  useContext(ShoppingCartContext);

export const ShoppingCartProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // ADD TO CART
  const addToCart = (product: ProductType) => {
    // Look in the cartItems array to see if this product is already in the cart
    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.product.id === product.id
    );
    // If it is, add 1 to the quantity of that product
    if (existingCartItemIndex !== -1) {
      // Get the existingCartItem
      const existingCartItem = cartItems[existingCartItemIndex];
      // Create updatedCartItem, add the product data from existingCartItem and then add 1 to the qty
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      // Create a new copy of the cartItems array called updatedCartItems
      const updatedCartItems = [...cartItems];
      // Find the existing product in the cart and change it to out updatedCartItem object
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
      // Update the cartItems state
      setCartItems(updatedCartItems);
    } else {
      // If the added product is not already in the cart, add it to the cartItems array, setting the qty to 1
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  // REMOVE FROM CART
  const removeFromCart = (productId: number) => {
    // Create a copy of cartItems, but filter out the product that has been removed
    const updatedCartItems = cartItems.filter(
      (item) => item.product.id !== productId
    );
    // Update the cartItems state
    setCartItems(updatedCartItems);
  };

  // UPDATE CART ITEM QUANTITY
  const updateCartItemQuantity = (productId: number, quantity: number) => {
    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.product.id === productId
    );
    if (existingCartItemIndex !== -1) {
      const existingCartItem = cartItems[existingCartItemIndex];
      const updatedCartItem = {
        ...existingCartItem,
        quantity,
      };
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
      setCartItems(updatedCartItems);
    }
  };

  // CALCULATE CART TOTAL PRICE
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // TOTAL ITEMS IN CART
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShoppingCartContext.Provider
      value={{
        isOpen,
        setIsOpen,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
