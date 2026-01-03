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
    if (Object.keys(items).length > 0) {
      dispatch(loadCartProducts(items));
    }

    if (!isAuth) {
      router.push("/");
    }
  }, [isAuth, router, dispatch, items]);

  if (!Object.keys(items).length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 bg-white dark:bg-zinc-950 transition-colors duration-500">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          {tCart("empty")}
        </h2>
        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">
          {tCart("title")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {fullProductInfo.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b border-gray-200 dark:border-zinc-800 pb-6 last:border-0"
              >
                <Link href={`/product/${item.id}`}>
                  <img
                    src={item.image || "/products/shoe.jpg"}
                    alt={item.name_en}
                    className="w-24 h-32 object-cover rounded-md bg-gray-100 dark:bg-zinc-800"
                  />
                </Link>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-lg text-black dark:text-white">
                        {isRtl ? item.name_ar : item.name_en}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch(deleteItem(item.id))}
                      className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-300 px-2"
                    >
                      x
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-gray-300 dark:border-zinc-700 rounded-lg overflow-hidden bg-white dark:bg-zinc-900">
                      <button
                        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer text-black dark:text-white"
                        onClick={() =>
                          dispatch(
                            changeQuantity({
                              id: item.id,
                              price: item.price,
                              type: "dec",
                            })
                          )
                        }
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm text-black dark:text-white">
                        {items[item.id] || 1}
                      </span>
                      <button
                        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer text-black dark:text-white"
                        onClick={() =>
                          dispatch(
                            changeQuantity({
                              id: item.id,
                              price: item.price,
                              type: "inc",
                            })
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold ml-auto text-black dark:text-white">
                      ${(item.price * (items[item.id] || 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-xl h-fit sticky top-24 border border-gray-100 dark:border-zinc-800 transition-all duration-500">
            <h2 className="text-xl font-semibold mb-6 text-black dark:text-white">
              {tCart("details.summary")}
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>{tCart("details.subtotal")}</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>{tCart("details.shipping")}</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-zinc-700 pt-4 flex justify-between text-lg font-bold text-black dark:text-white">
                <span>{tCart("details.total")}</span>
                <span>${(totalPrice + shipping).toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout">
              <button className="w-full cursor-pointer bg-black dark:bg-white text-white dark:text-black mt-8 py-4 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 ease-in-out active:scale-95">
                {tCart("details.checkout")}
              </button>
            </Link>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
              {tCart("details.taxes")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
