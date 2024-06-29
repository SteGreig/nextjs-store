import Image from "next/image";
import { Product as ProductType } from "../types/Product";
import { ShoppingCartIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";
import truncate from "../helpers/truncateString";
import formatPrice from "../helpers/formatPrice";

type Props = {
  product: ProductType;
};

export const ProductCard = ({ product }: Props) => (
  <article
    key={product.id}
    className="flex flex-col bg-white shadow-xl hover:shadow-2xl transition duration-300 rounded-xl overflow-hidden"
  >
    <div className="p-2 pb-0">
      <div className="w-full aspect-square relative bg-gray-100 rounded-lg">
        <Image
          className="w-full h-full object-contain"
          width={200}
          height={200}
          src={product.images[0]}
          alt={product.title}
        />
      </div>
    </div>
    <div className="p-4 pb-2 md:pb-4 flex flex-col flex-1 gap-2">
      <h3 className="font-semibold leading-snug">{product.title}</h3>
      <p className="text-gray-500 font-light text-sm/snug hidden md:block">
        {truncate(product.description, 90)}...
      </p>
    </div>
    <div className="md:border-t border-gray-200 p-4 pt-0 md:pt-4 mt-auto flex flex-wrap items-center justify-between gap-2">
      <p className="font-medium w-full md:w-auto">
        {formatPrice(product.price)}
      </p>
      <button className="btn btn--outline">
        <span>Add to basket</span>
        <PlusIcon />
      </button>
    </div>
  </article>
);
