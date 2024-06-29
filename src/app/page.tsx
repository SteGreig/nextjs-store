import { fetchProducts } from './data/fetchProducts';
import { fetchCategories } from './data/fetchCategories';
import { ProductCard } from './components/ProductCard';

export default async function Home() {
  const categories = await fetchCategories();
  const products = await fetchProducts();

  return (
    <>
      <div className="flex justify-center mt-8">
        <div className="w-full p-3 xl:p-6 grid gap-3 xl:gap-6 grid-cols-4 lg:grid-cols-5">

          <div className="hidden md:block md:sticky top-0 h-screen overflow-y-auto col-span-1 pt-4 -mt-4">
            <h1 className="font-semibold mb-2">Products</h1>
            {categories.map((category) => {
              const count = products.filter(product => product.category === category.slug).length;
              return (
                <div key={category.slug}>
                  <a className='flex gap-1 items-baseline py-1 hover:text-purple-500' href={`#${category.slug}`}>
                    {category.name}
                    <span className='text-xs opacity-50'>({count})</span>
                  </a>
                </div>
              )
            })}
          </div>

          <div className="col-span-full md:col-span-3 lg:col-span-4">
            <div className="grid gap-16">
              {categories.map((category) => (
                <section
                  key={category.slug}
                  className="grid gap-2"
                  id={category.slug}
                >
                  <h2 className="font-light text-2xl xl:text-3xl mb-3">{category.name}</h2>

                  <div className="grid gap-3 xl:gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
