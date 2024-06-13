import Image from 'next/image';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import {
  ShoppingCart,
  ShoppingCartButton,
  ShoppingCartProvider,
} from './ShoppingCart';
import { fetchCart } from './fetchCart';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dummy store',
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: Props) {
  const cart = await fetchCart();

  return (
    <html>
      <body className={inter.className}>
        <ShoppingCartProvider>
          <div className="p-4 px-8 bg-white border-b flex justify-center ">
            <div className="w-full flex justify-between">
              <Image src="/logo.svg" width="174" height="26" />
              <ShoppingCartButton />
            </div>
          </div>
          {children}
          <ShoppingCart cart={cart} />
        </ShoppingCartProvider>
      </body>
    </html>
  );
}
