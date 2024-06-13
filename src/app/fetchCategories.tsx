export type Category = {
  name: string;
  slug: string;
  url: string;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`https://dummyjson.com/products/categories`);
  const categories = await response.json();

  return categories;
};
