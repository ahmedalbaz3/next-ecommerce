"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import ProductCard from "@/app/[locale]/components/ui/ProductCard/ProductCard";
import { useAppSelector } from "@/store/actions";

const ProductsHome = () => {
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("common");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto max-md:px-4">
      <h2 className="text-4xl font-semibold text-center my-12">
        {t("ourProducts")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8  ">
        {products.map((product: any) => (
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
            description_en={product.description_ar}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsHome;
