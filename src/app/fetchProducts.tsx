export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: string;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`https://dummyjson.com/products?limit=999`);
  const { products } = await response.json();

  return products;
};
