"use client";

import { useAppSelector } from "@/store/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function CheckoutPage() {
  const t = useTranslations("Checkout");
  const router = useRouter();

  const { items, fullProductInfo, totalPrice } = useAppSelector(
    (state) => state.cartReducer
  );
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const shippingCost = 10;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 py-12" dir={isRtl ? "rtl" : "ltr"}>
        <div className="mb-12">
          <Link
            href="/cart"
            className="text-sm flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
          >
            <span>{isRtl ? "←" : "→"}</span>
            {t("backToCart")}
          </Link>
          <h1 className="text-3xl font-bold mt-4 text-black dark:text-white">
            {t("title")}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-xl font-semibold mb-6 text-black dark:text-white">
                {t("contactInfo.title")}
              </h2>
              <input
                type="email"
                placeholder={t("contactInfo.email")}
                className="w-full p-4 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-900 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all duration-300"
              />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-6 text-black dark:text-white">
                {t("shippingAddress.title")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "firstName", col: "" },
                  { name: "lastName", col: "" },
                  { name: "address", col: "md:col-span-2" },
                  { name: "city", col: "" },
                  { name: "postalCode", col: "" },
                ].map((field) => (
                  <input
                    key={field.name}
                    type="text"
                    placeholder={t(`shippingAddress.${field.name}`)}
                    className={`${field.col} p-4 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-900 text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all duration-300`}
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-6 text-black dark:text-white">
                {t("payment.title")}
              </h2>
              <div className="border border-gray-200 dark:border-zinc-800 rounded-xl p-6 bg-gray-50 dark:bg-zinc-900 space-y-4 transition-all duration-500">
                <div className="text-sm font-medium text-black dark:text-white">
                  {t("payment.creditCard")}
                </div>
                <input
                  type="text"
                  placeholder={t("payment.cardNumber")}
                  className="w-full p-4 border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all duration-300"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t("payment.expiry")}
                    className="p-4 border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all duration-300"
                  />
                  <input
                    type="text"
                    placeholder={t("payment.cvc")}
                    className="p-4 border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all duration-300"
                  />
                </div>
              </div>
            </section>

            <button className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-full font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 transform active:scale-[0.98] cursor-pointer">
              {t("payment.payNow")} • ${(totalPrice + shippingCost).toFixed(2)}
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-2xl sticky top-24 border border-gray-100 dark:border-zinc-800 transition-all duration-500">
              <h2 className="text-lg font-bold mb-6 text-black dark:text-white">
                {t("summary.title")}
              </h2>

              <div className="max-h-[40vh] overflow-y-auto no-scrollbar">
                {fullProductInfo.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 text-sm mb-6"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={product.image || "/products/shoe.jpg"}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-zinc-700"
                        alt={product.name_en}
                      />
                      <span
                        className={`absolute -top-2 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ${
                          isRtl ? "-left-2" : "-right-2"
                        }`}
                      >
                        {items[product.id]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-black dark:text-white">
                        {isRtl ? product.name_ar : product.name_en}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        {t("summary.size", { size: "M" })}
                      </p>
                    </div>
                    <span className="font-medium text-black dark:text-white">
                      ${product.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-zinc-700 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>{t("summary.subtotal")}</span>
                  <span className="font-medium text-black dark:text-white">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>{t("summary.shipping")}</span>
                  <span className="font-medium text-black dark:text-white">
                    ${shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200 dark:border-zinc-700 mt-3 text-black dark:text-white">
                  <span>{t("summary.total")}</span>
                  <span>${(totalPrice + shippingCost).toFixed(2)}</span>
                </div>
              </div>
              <p className="mt-6 text-[11px] text-gray-400 dark:text-zinc-500 leading-relaxed text-center">
                {t("summary.terms")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
