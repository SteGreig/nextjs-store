import { fetchProducts } from './fetchProducts';
import { fetchCategories } from './fetchCategories';
import { ProductCard } from './ProductCard';

export default async function Home() {
  const categories = await fetchCategories();
  const products = await fetchProducts();

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full p-2 grid gap-8 grid-cols-4">
          <div className="col-span-1 p-1">
            <h1 className="font-bold mb-6">Products</h1>
            {categories.map((category) => (
              <div key={category.slug}>
                <a href={`#${category.slug}`}>{category.name}</a>
              </div>
            ))}
          </div>
          <div className="col-span-3">
            <div className="grid gap-2">
              {categories.map((category) => (
                <section
                  key={category.slug}
                  className="grid gap-2"
                  id={category.slug}
                >
                  <h2 className="font-light text-2xl">{category.name}</h2>
                  <div className="grid gap-2 grid-cols-3">
                    {products
                      .filter((product) => product.category === category.slug)
                      .map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
