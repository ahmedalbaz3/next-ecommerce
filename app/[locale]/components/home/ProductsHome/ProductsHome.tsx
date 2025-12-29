"use client";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/api/api";

import ProductCard from "@/app/[locale]/components/ui/ProductCard/ProductCard";
import { useAppSelector } from "@/store/actions";

const ProductsHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto max-md:px-4">
      <h2 className="text-4xl font-semibold text-center my-12">
        {isRtl ? "منتجاتنا" : "Our Products"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8  ">
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name_en={product.name_en}
            name_ar={product.name_ar}
            price={product.price}
            image="/"
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
