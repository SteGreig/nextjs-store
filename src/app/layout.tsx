import Image from "next/image";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import {
  ShoppingCart,
  ShoppingCartButton,
  ShoppingCartProvider,
} from "./components/ShoppingCart";
import { fetchCart } from "./data/fetchCart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Dummy Store",
    template: "%s - Dummy Store",
  },
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac maximus tellus. Praesent porttitor ac eros non pulvinar.",
  metadataBase: new URL("https://ooooby.vercel.app/"),
  openGraph: {
    images: {
      url: "/opengraph-image.png",
      width: 1920,
      height: 960,
    },
  },
  twitter: {
    card: "summary_large_image",
  },
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: Props) {
  // const cart = await fetchCart();
  // const cartCount = cart.products.length;

  return (
    <html className="scroll-smooth" lang="en">
      <body className={inter.className}>
        <ShoppingCartProvider>
          <div className="px-3 py-4 xl:px-6 bg-white border-b flex justify-center">
            <div className="w-full flex justify-between">
              <Image
                src="/logo.svg"
                alt="Dummy Store Logo"
                width="174"
                height="26"
              />
              <ShoppingCartButton />
              <ShoppingCart />
            </div>
          </div>
          {children}
        </ShoppingCartProvider>
      </body>
    </html>
  );
}
