"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProductById } from "@/api/api";
import { useParams } from "next/navigation";
import { TProduct } from "@/types/TProduct";
import AddToCart from "@/app/[locale]/components/ui/AddToCart/AddToCart";
import Script from "next/script";
import { useAppSelector } from "@/store/actions";

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [product, setProduct] = useState<TProduct>();
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);

  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id as string);

      setProduct(data);
    };

    getProduct();
  }, []);

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product?.name_en,
    image: product?.image,
    description: product?.description_en,
    brand: {
      "@type": "Brand",
      name: product?.name_en,
    },
    offers: {
      "@type": "Offer",
      url: `https://localhost/product/${product?.id}`,
      priceCurrency: "USD",
      price: product?.price,
      availability: product?.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      <Link
        href="/product"
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 transition-colors"
      >
        Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
        <div className="space-y-4">
          <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-gray-100">
            <img
              src="/products/shoe.jpg"
              alt={`${product?.name_en} `}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="lg:sticky lg:top-24 h-fit space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              {isRtl ? product?.name_ar : product?.name_en}
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-2xl font-medium">
                ${product?.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-1 border-l pl-4">
                <span className="text-sm font-bold">4.6</span>
                <span className="text-sm text-gray-400">({170} reviews)</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {isRtl ? product?.description_ar : product?.description_en}
          </p>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm font-bold uppercase tracking-wider">
                Select Size
              </span>
              <button className="text-xs text-gray-400 underline">
                Size Guide
              </button>
            </div>
            <div className="flex gap-3">
              {product?.sizes &&
                product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center font-medium transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex gap-4">
              <AddToCart
                id={product ? product.id : "p1"}
                price={product ? product?.price : 0}
                style="w-full bg-black text-white"
                dir={isRtl ? "rtl" : "ltr"}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-8 border-t">
            <div className="flex gap-4 items-start">
              <div>
                <p className="text-sm font-bold">Complimentary Shipping</p>
                <p className="text-xs text-gray-500">On all orders over $150</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div>
                <p className="text-sm font-bold">2-Year Warranty</p>
                <p className="text-xs text-gray-500">
                  Quality guaranteed or full refund
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script type="application/ld+json" id="product-schema">
        {JSON.stringify(jsonLd)}
      </Script>
    </div>
  );
}
