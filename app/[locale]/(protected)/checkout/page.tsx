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

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <Link
          href="/cart"
          className="text-sm flex items-center gap-2 text-gray-500 hover:text-black transition-colors"
        >
          <div className="">--</div>Back to Cart
        </Link>
        <h1 className="text-3xl font-bold mt-4">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="p-4 border rounded-xl outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="p-4 border rounded-xl outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder="Address"
                className="md:col-span-2 p-4 border rounded-xl outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder="City"
                className="p-4 border rounded-xl outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="p-4 border rounded-xl outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Payment Details</h2>
              <span className="text-gray-400">
                <div className="">--</div>
              </span>
            </div>
            <div className="border rounded-xl p-6 bg-gray-50 space-y-4">
              <div className="flex items-center gap-3 mb-2 text-sm font-medium">
                <div className="">--</div>Credit Card
              </div>
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-4 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-black"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="p-4 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="p-4 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </section>

          <button className="w-full bg-black text-white py-5 rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform active:scale-[0.98]">
            Pay Now • ${(totalPrice + 10).toFixed(2)}
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-8 rounded-2xl sticky top-24 border border-gray-100">
            <h2 className="text-lg font-bold mb-6">Order Summary</h2>

            {fullProductInfo.map((product) => (
              <div key={product.id} className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-sm">
                  <div className="relative">
                    <img
                      src="/products/shoe.jpg"
                      className="w-16 h-16 object-cover rounded-lg border"
                      alt="item"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                      {items[product.id]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{product.name_en}</p>
                    <p className="text-gray-500 text-xs">Size: M</p>
                  </div>
                  <span className="font-medium">${product.price}</span>
                </div>
              </div>
            ))}

            <div className="space-y-3 pt-6 border-t text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium">$10.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-3 border-t mt-3">
                <span>Total</span>
                <span>${(totalPrice + 10).toFixed(2)}</span>
              </div>
            </div>

            <p className="mt-6 text-[11px] text-gray-400 leading-relaxed text-center">
              By clicking "Pay Now", you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
