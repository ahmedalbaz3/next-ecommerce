import { TProduct } from "@/types/TProduct";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "../AddToCart/AddToCart";

interface productCardProps extends TProduct {
  isRtl: boolean;
}

const ProductCard2 = ({
  id,
  name_en,
  name_ar,
  price,
  image,
  inStock,
  oldPrice,
  isRtl = false,
}: productCardProps) => {
  const t = useTranslations("productCard");
  return (
    <div className="product-card  ">
      <div className="product-card-top overflow-hidden mb-5 relative aspect-square rounded-lg bg-gray-100 dark:bg-zinc-900">
        <Link href={`/product/${id}`}>
          <Image
            fill
            src={image}
            alt={isRtl ? name_ar : name_en}
            className="object-cover transition-transform duration-300 hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {!inStock && (
          <span className="state absolute top-2 left-2 px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-sm shadow-md z-10 rtl:left-auto rtl:right-2">
            {t("outOfStock")}
          </span>
        )}
      </div>
      <div className="product-card-bottom flex flex-col gap-3">
        <div className="title dark:text-white text-2xl">
          {isRtl ? name_ar : name_en}
        </div>
        <div className="price text-violet-900 dark:text-violet-400 text-xl font-semibold flex gap-3">
          <span>${price.toFixed(2)}</span>
          {oldPrice && (
            <span className="line-through text-gray-400">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>
        <AddToCart
          inStock={inStock}
          id={id}
          price={price}
          dir={isRtl ? "rtl" : "ltr"}
        />
      </div>
    </div>
  );
};

export default ProductCard2;
