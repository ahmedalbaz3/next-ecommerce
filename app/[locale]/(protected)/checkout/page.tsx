"use client";

import { useAppSelector } from "@/store/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { items, fullProductInfo, totalPrice } = useAppSelector(
    (state) => state.cartReducer
  );
  const router = useRouter();
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );

  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div
      className={`max-w-6xl mx-auto px-4 py-12 ${
        isRtl ? "text-right" : "text-left"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="mb-12">
        <Link
          href="/cart"
          className="text-sm flex items-center gap-2 text-gray-500 hover:text-black transition-colors"
        >
          <div className="">{isRtl ? "--" : "--"}</div>
          {isRtl ? "العودة للسلة" : "Back to Cart"}
        </Link>
        <h1 className="text-3xl font-bold mt-4">
          {isRtl ? "الدفع" : "Checkout"}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-xl font-semibold mb-6">
              {isRtl ? "معلومات الاتصال" : "Contact Information"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="email"
                placeholder={isRtl ? "البريد الإلكتروني" : "Email Address"}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-6">
              {isRtl ? "عنوان الشحن" : "Shipping Address"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={isRtl ? "الاسم الأول" : "First Name"}
                className="p-4 border rounded-xl outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder={isRtl ? "الاسم الأخير" : "Last Name"}
                className="p-4 border rounded-xl outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder={isRtl ? "العنوان" : "Address"}
                className="md:col-span-2 p-4 border rounded-xl outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder={isRtl ? "المدينة" : "City"}
                className="p-4 border rounded-xl outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder={isRtl ? "الرمز البريدي" : "Postal Code"}
                className="p-4 border rounded-xl outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {isRtl ? "تفاصيل الدفع" : "Payment Details"}
              </h2>
            </div>
            <div className="border rounded-xl p-6 bg-gray-50 space-y-4">
              <div className="flex items-center gap-3 mb-2 text-sm font-medium">
                <div className="">--</div>
                {isRtl ? "بطاقة ائتمان" : "Credit Card"}
              </div>
              <input
                type="text"
                placeholder={isRtl ? "رقم البطاقة" : "Card Number"}
                className="w-full p-4 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-black"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={isRtl ? "شهر / سنة" : "MM / YY"}
                  className="p-4 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  placeholder={isRtl ? "الكود (CVC)" : "CVC"}
                  className="p-4 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </section>

          <button className="w-full bg-black text-white py-5 rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform active:scale-[0.98]">
            {isRtl ? "ادفع الآن" : "Pay Now"} • ${(totalPrice + 10).toFixed(2)}
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-8 rounded-2xl sticky top-24 border border-gray-100">
            <h2 className="text-lg font-bold mb-6">
              {isRtl ? "ملخص الطلب" : "Order Summary"}
            </h2>

            {fullProductInfo.map((product) => (
              <div key={product.id} className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-sm">
                  <div className="relative">
                    <img
                      src="/products/shoe.jpg"
                      className="w-16 h-16 object-cover rounded-lg border"
                      alt="item"
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
                      {isRtl ? "المقاس: M" : "Size: M"}
                    </p>
                  </div>
                  <span className="font-medium">${product.price}</span>
                </div>
              </div>
            ))}

            <div className="space-y-3 pt-6 border-t text-sm">
              <div className="flex justify-between text-gray-600">
                <span>{isRtl ? "المجموع الفرعي" : "Subtotal"}</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{isRtl ? "الشحن" : "Shipping"}</span>
                <span className="font-medium">$10.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-3 border-t mt-3">
                <span>{isRtl ? "الإجمالي" : "Total"}</span>
                <span>${(totalPrice + 10).toFixed(2)}</span>
              </div>
            </div>

            <p className="mt-6 text-[11px] text-gray-400 leading-relaxed text-center">
              {isRtl
                ? 'بالضغط على "ادفع الآن"، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا.'
                : 'By clicking "Pay Now", you agree to our Terms of Service and Privacy Policy.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
