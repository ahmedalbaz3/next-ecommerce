"use client";

import Image from "next/image";
import Link from "next/link";
import { TProduct } from "@/types/TProduct";
import AddToCart from "../AddToCart/AddToCart";
import { useTranslations } from "next-intl";

interface productCardProps extends TProduct {
  isRtl: boolean;
}

const ProductCard = ({
  id,
  name_en,
  name_ar,
  price,
  image,
  inStock,
  isRtl = false,
}: productCardProps) => {
  const t = useTranslations("productCard");

  return (
    <div
      className="group relative w-full h-[32rem] rounded-3xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 flex flex-col transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/10"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <Link
        href={`/product/${id}`}
        className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-gray-50 dark:bg-zinc-800"
      >
        <Image
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
          src={image}
          alt={isRtl ? name_ar : name_en}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {!inStock && (
          <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
              {t("outOfStock")}
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 justify-between">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-xl font-bold tracking-tight text-black dark:text-white line-clamp-2 transition-colors duration-500">
              {isRtl ? name_ar : name_en}
            </h3>

            <AddToCart
              inStock={inStock}
              id={id}
              price={price}
              dir={isRtl ? "rtl" : "ltr"}
            />
          </div>
        </div>

        <div className="flex items-end justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 dark:text-zinc-500 transition-colors duration-500">
              {t("price")}
            </span>
            <span className="text-2xl font-black text-black dark:text-white transition-colors duration-500">
              ${price}
            </span>
          </div>

          <div className="text-[10px] font-medium text-gray-400 dark:text-zinc-500">
            {t("inclTax") || "+ Tax"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
