"use client";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/actions";
import {
  changeQuantity,
  deleteItem,
  loadCartProducts,
} from "@/store/slices/cartSlice";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const tCart = useTranslations("cart");

  const shipping = 10.0;
  const { items, fullProductInfo, totalPrice } = useAppSelector(
    (state) => state.cartReducer
  );
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);
  const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated);

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(items);
    if (Object.keys(items).length > 0) {
      dispatch(loadCartProducts(items));
    }

    if (!isAuth) {
      router.push("/");
    }
  }, [isAuth, router, dispatch]);
  // ========= handle delete item ========

  const handleDeleteItem = (id: string) => {
    dispatch(deleteItem(id));
  };

  // ========= handle change quantity ========
  const handleChangeQuantity = ({
    id,
    price,
    type,
  }: {
    id: string;
    price: number;
    type: "inc" | "dec";
  }) => {
    dispatch(changeQuantity({ id, price, type }));
  };

  //  ======== Empty Cart View ========
  if (!Object.keys(items).length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-semibold">{tCart("empty")}</h2>
        <Link
          href="/"
          className="text-blue-600 hover:underline flex items-center gap-2"
        ></Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{tCart("title")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {fullProductInfo.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border-b pb-6 last:border-0"
            >
              <img
                src="/products/shoe.jpg"
                alt={item.name_en}
                className="w-24 h-32 object-cover rounded-md bg-gray-100"
              />

              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-lg">
                      {isRtl ? item.name_ar : item.name_en}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <div className="" onClick={() => handleDeleteItem(item.id)}>
                      x
                    </div>
                  </button>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        handleChangeQuantity({
                          id: item.id,
                          price: item.price,
                          type: "dec",
                        })
                      }
                    >
                      <div className="">-</div>
                    </button>
                    <span className="w-8 text-center text-sm">
                      {items[item.id] || 1}
                    </span>
                    <button
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        handleChangeQuantity({
                          id: item.id,
                          price: item.price,
                          type: "inc",
                        })
                      }
                    >
                      <div className="">+</div>
                    </button>
                  </div>
                  <p className="font-semibold ml-auto">
                    ${(item.price * (items[item.id] || 1)).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-8 rounded-xl h-fit sticky top-24">
          <h2 className="text-xl font-semibold mb-6">
            {tCart("details.summary")}
          </h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>{tCart("details.subtotal")}</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>{tCart("details.shipping")}</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>{tCart("details.total")}</span>
              <span>${(totalPrice + 10).toFixed(2)}</span>
            </div>
          </div>
          <Link href="/checkout">
            <button className="w-full cursor-pointer bg-black text-white mt-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors">
              {tCart("details.checkout")}
            </button>
          </Link>
          <p className="text-center text-xs text-gray-500 mt-4">
            {tCart("details.taxes")}
          </p>
        </div>
      </div>
    </div>
  );
}
