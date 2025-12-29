import Image from "next/image";
import Link from "next/link";
import { TProduct } from "@/types/TProduct";
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
  isRtl = false,
  description_ar,
  description_en,
}: productCardProps) => {
  return (
    <div className="w-full h-120 rounded-2xl border border-gray-300 p-4 flex flex-col items-center mx-auto">
      <Link
        href={`/product/${id}`}
        className="image rounded-xl overflow-hidden mb-4 w-full"
      >
        <Image
          className="w-full"
          src="/products/shoe.jpg"
          alt=""
          width={200}
          height={200}
          loading="eager"
        />
      </Link>
      <div className="details w-full text-2xl">
        <div className="top flex justify-between items-center">
          <h3>{isRtl ? name_ar : name_en}</h3>
          <AddToCart id={id} price={price} dir={isRtl ? "rtl" : "ltr"} />
        </div>
        <div className="bottom flex gap-1.5 mt-4 items-center text-xl ">
          <span className=" text-sky-400 font-semibold text-2xl">
            {isRtl ? "السعر:" : "price:"}
          </span>
          <div className="value">${price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
