import { TProduct } from "@/types/TProduct";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "../AddToCart/AddToCart";

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
  oldPrice,
  isRtl = false,
  description_en,
  description_ar,
}: productCardProps) => {
  const t = useTranslations("productCard");
  return (
    <Link
      href={`/product/${id}`}
      className="product-card p-1.5 rounded-3xl shadow-2xl  flex flex-col dark:bg-zinc-600"
    >
      <div className="product-card-top  mb-5 relative z-40 aspect-square rounded-xl  ">
        <div className="h-full overflow-hidden relative rounded-xl aspect-square ">
          <Image
            fill
            src={image}
            alt={isRtl ? name_ar : name_en}
            className="object-cover hover:scale-110 duration-300 relative z-10  rounded-xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
        <div className="product-data w-full h-full absolute top-6 bg-black rounded-xl flex justify-center items-end text-white dark:bg-zinc-900">
          <span className="text-sm">
            {isRtl ? description_ar : description_en}
          </span>
        </div>

        {!inStock && (
          <span className="state absolute top-2 left-2 px-3 py-1 z-30 bg-red-600 text-white text-sm font-bold rounded-sm shadow-md  rtl:left-auto rtl:right-2">
            {t("outOfStock")}
          </span>
        )}
      </div>
      <div className="product-card-bottom flex  gap-3  mt-5 pb-2">
        <div className="title flex-3 dark:text-white text-xl whitespace-nowrap flex flex-col">
          <div>{isRtl ? name_ar : name_en}</div>
          <AddToCart
            inStock={inStock}
            id={id}
            price={price}
            dir={isRtl ? "rtl" : "ltr"}
          />
          {/* <div className="add-to-cart text-sm py-1.5 px-2.5 bg-amber-500 rounded-2xl w-fit mt-3">
            add to cart
          </div> */}
        </div>
        <div className="price flex-1  dark:text-white text-xl font-semibold flex flex-col items-center justify-center border-l pl-3 ">
          <span>${price.toFixed(2)}</span>
          {oldPrice && (
            <span className="line-through text-gray-400 text-xs text-center">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* <AddToCart
          inStock={inStock}
          id={id}
          price={price}
          dir={isRtl ? "rtl" : "ltr"}
        /> */}
      </div>
    </Link>
  );
};

export default ProductCard;
