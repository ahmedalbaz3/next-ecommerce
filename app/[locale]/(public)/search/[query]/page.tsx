import ProductCard2 from "@/app/[locale]/components/ui/ProductCard/ProductCard";
import { TProduct } from "@/types/TProduct";
import { getTranslations } from "next-intl/server";
import React from "react";

const fetchResults = async (qury: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?q=${encodeURIComponent(
        qury
      )}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Search error:", error);
  }
};

const page = async ({
  params,
}: {
  params: Promise<{ query: string; locale: "ar" | "en" }>;
}) => {
  const t = await getTranslations("results");

  const { query, locale } = await params;
  const isRtl = locale === "ar";
  const decodedQuery = decodeURIComponent(query);

  const products = await fetchResults(decodedQuery);
  console.log(products.length);

  return (
    <div>
      <section
        className="bg-white dark:bg-zinc-950 py-16 transition-colors duration-500"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="container mx-auto max-md:px-4">
          <div className="flex flex-col items-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black dark:text-white text-center">
              {t("results")}:{" "}
              {products.length > 0 && (
                <span className="text-green-500  font-bold">
                  {decodedQuery}
                </span>
              )}
            </h2>
            <div className="h-1 w-20 bg-black dark:bg-white rounded-full"></div>
          </div>
          {products.length === 0 && (
            <h2 className="text-center text-3xl  py-5">
              {t("noResults")}:{" "}
              <span className="text-red-500  font-bold">{decodedQuery}</span>
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product: TProduct) => (
              <ProductCard2
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
      </section>
    </div>
  );
};

export default page;
