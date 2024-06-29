import { fetchProducts } from "./data/fetchProducts";
import { fetchCategories } from "./data/fetchCategories";
import { ProductCard } from "./components/ProductCard";
import { SideNav } from "./components/SideNav";

export default async function Home() {
  const categories = await fetchCategories();
  const products = await fetchProducts();

  return (
    <>
      <div className="flex justify-center pt-6">
        <div className="w-full p-3 xl:p-6 grid gap-3 xl:gap-8 2xl:gap-10 grid-cols-4 lg:grid-cols-5">
          <SideNav
            heading="Products"
            headingLevel={1}
            categories={categories}
            products={products}
          />

          <div className="col-span-full md:col-span-3 lg:col-span-4">
            <div className="grid gap-10 xl:gap-16">
              {categories.map((category) => (
                <section
                  key={category.slug}
                  className="grid gap-2"
                  id={category.slug}
                >
                  <h2 className="font-light text-2xl xl:text-3xl mb-1 xl:mb-3">
                    {category.name}
                  </h2>

                  <div className="grid gap-3 xl:gap-5 2xl:gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
