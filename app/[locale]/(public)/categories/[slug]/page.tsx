import ProductCard from "@/app/[locale]/components/ui/ProductCard/ProductCard";
import { TProduct } from "@/types/TProduct";
import { getTranslations } from "next-intl/server";

async function getProductsByCategory(slug: string): Promise<TProduct[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  const allProducts: TProduct[] = data.products;

  return allProducts.filter((product) => product.categoryId === slug);
}

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
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl text-gray-500">
          {isRtl
            ? "لا توجد منتجات متوفرة حالياً"
            : "No products found for this category."}
        </h2>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold capitalize mb-4">
          {isRtl ? "تصنيف" : "Category"}: {slug.replace("-", " ")}
        </h1>
        <p className="text-gray-500">
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
          />
        ))}
      </div>
    </main>
  );
}
