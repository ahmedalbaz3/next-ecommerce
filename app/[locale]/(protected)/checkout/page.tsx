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
    <div className="max-w-6xl mx-auto px-4 py-12" dir={isRtl ? "rtl" : "ltr"}>
      <div className="mb-12">
        <Link
          href="/cart"
          className="text-sm flex items-center gap-2 text-gray-500 hover:text-black transition-colors"
        >
          <span>{isRtl ? "←" : "→"}</span>
          {t("backToCart")}
        </Link>
        <h1 className="text-3xl font-bold mt-4">{t("title")}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          {/* Contact Info */}
          <section>
            <h2 className="text-xl font-semibold mb-6">
              {t("contactInfo.title")}
            </h2>
            <input
              type="email"
              placeholder={t("contactInfo.email")}
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
            />
          </section>

          {/* Shipping Address */}
          <section>
            <h2 className="text-xl font-semibold mb-6">
              {t("shippingAddress.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t("shippingAddress.firstName")}
                className="p-4 border rounded-xl outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder={t("shippingAddress.lastName")}
                className="p-4 border rounded-xl outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder={t("shippingAddress.address")}
                className="md:col-span-2 p-4 border rounded-xl outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder={t("shippingAddress.city")}
                className="p-4 border rounded-xl outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder={t("shippingAddress.postalCode")}
                className="p-4 border rounded-xl outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-xl font-semibold mb-6">{t("payment.title")}</h2>
            <div className="border rounded-xl p-6 bg-gray-50 space-y-4">
              <div className="text-sm font-medium">
                {t("payment.creditCard")}
              </div>
              <input
                type="text"
                placeholder={t("payment.cardNumber")}
                className="w-full p-4 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-black"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t("payment.expiry")}
                  className="p-4 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  placeholder={t("payment.cvc")}
                  className="p-4 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </section>

          <button className="w-full bg-black text-white py-5 rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform active:scale-[0.98]">
            {t("payment.payNow")} • ${(totalPrice + shippingCost).toFixed(2)}
          </button>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-8 rounded-2xl sticky top-24 border border-gray-100">
            <h2 className="text-lg font-bold mb-6">{t("summary.title")}</h2>

            {fullProductInfo.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 text-sm mb-6"
              >
                <div className="relative">
                  <img
                    src={product.image || "/products/shoe.jpg"}
                    className="w-16 h-16 object-cover rounded-lg border"
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
                  <p className="font-medium">
                    {isRtl ? product.name_ar : product.name_en}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {t("summary.size", { size: "M" })}
                  </p>
                </div>
                <span className="font-medium">${product.price}</span>
              </div>
            ))}

            <div className="space-y-3 pt-6 border-t text-sm">
              <div className="flex justify-between text-gray-600">
                <span>{t("summary.subtotal")}</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t("summary.shipping")}</span>
                <span className="font-medium">${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-3 border-t mt-3">
                <span>{t("summary.total")}</span>
                <span>${(totalPrice + shippingCost).toFixed(2)}</span>
              </div>
            </div>
            <p className="mt-6 text-[11px] text-gray-400 leading-relaxed text-center">
              {t("summary.terms")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
