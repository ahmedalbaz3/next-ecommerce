"use client";

import ProductCard from "@/app/[locale]/components/ui/ProductCard/ProductCard";
import { useAppSelector } from "@/store/actions";
import { TProduct } from "@/types/TProduct";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { slug } = useParams();
  const [data, setData] = useState<TProduct[]>([]);
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);

  if (!data.length)
    return (
      <h2 className="text-3xl text-red-500 mt-20 text-center">
        {isRtl
          ? "لا يوجد منتجات في هذا التصنيف"
          : "There is no products for now for this category"}
      </h2>
    );
  return (
    <>
      <h2 className="text-3xl my-20 font-semibold text-center">
        {slug} products
      </h2>
      <div className="container  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name_en={product.name_en}
            name_ar={product.name_ar}
            price={product.price}
            image="/products/shoe.jpg"
            inStock={product.inStock}
            isRtl
            description_ar={product.description_ar}
            description_en={product.description_en}
          />
        ))}
      </div>
    </>
  );
};

export default page;
