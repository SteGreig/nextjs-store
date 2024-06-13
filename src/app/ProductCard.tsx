import Image from 'next/image';

export const ProductCard = ({ product }) => (
  <article key={product.id} className="bg-white p-4 border">
    <Image src={product.images[0]} width="200" height="200" />
    <h3>{product.title}</h3>
    <p className="font-bold">${product.price}</p>
    <p className="text-gray-400 font-extralight">{product.description}</p>
    <button className="bg-gray-400 text-white w-full">Add to basket</button>
  </article>
);
