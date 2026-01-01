"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ProductCard from "@/app/[locale]/components/ui/ProductCard/ProductCard";
import { useAppSelector } from "@/store/actions";

const ProductsHome = ({ limit }: { limit: number }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);
  const t = useTranslations("common");

  useEffect(() => {
    setMounted(true);
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data.products.slice(0, limit));
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="container mx-auto max-md:px-4 py-20 text-center">
        <div className="inline-block size-8 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium animate-pulse">
          {t("loading") || "Fetching luxury pieces..."}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-md:px-4 py-20 text-center">
        <div className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 p-6 rounded-3xl inline-block border border-red-100 dark:border-red-900/30">
          <p className="font-bold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section
      className="bg-white dark:bg-zinc-950 py-16 transition-colors duration-500"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="container mx-auto max-md:px-4">
        <div className="flex flex-col items-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black dark:text-white text-center">
            {t("ourProducts")}
          </h2>
          <div className="h-1 w-20 bg-black dark:bg-white rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
            >
              <ProductCard
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsHome;
