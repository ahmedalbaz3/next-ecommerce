import ProductCard from "@/app/[locale]/components/ui/ProductCard/ProductCard";
import { TProduct } from "@/types/TProduct";
import Feature2 from "@/app/[locale]/components/home/FeaturedCategories/Features";
import getProductsByCategory from "@/lib/getProductsByCategory";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string; locale: "ar" | "en" }>;
}) {
  const { slug, locale } = await params;
  const isRtl = locale === "ar";

  const productsRes = await getProductsByCategory(slug);
  const products = productsRes;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500">
        <h2 className="text-2xl font-medium text-gray-500 dark:text-zinc-400">
          {isRtl
            ? "لا توجد منتجات متوفرة حالياً"
            : "No products found for this category."}
        </h2>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 px-4 py-12"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="container mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter capitalize mb-4 text-black dark:text-white">
            {isRtl ? "تصنيف" : "Category"}: {slug.replace("-", " ")}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 font-medium">
            {products.length} {isRtl ? "منتجات وجدت" : "products found"}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name_en={product.name_en}
              name_ar={product.name_ar}
              price={product.price}
              image={product.image}
              inStock={product.inStock}
              isRtl={isRtl}
              description_ar={product.description_ar}
              description_en={product.description_en}
              oldPrice={product.oldPrice}
            />
          ))}
        </div>
      </div>
      <Feature2 params={params} />
    </main>
  );
}
