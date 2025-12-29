"use client";

import { useAppDispatch, useAppSelector } from "@/store/actions";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        <aside className="w-full md:w-64 space-y-2">
          <div className="mb-8 px-4">
            <h1 className="text-2xl font-bold">My Account</h1>
            <p className="text-gray-500 text-sm">Welcome back, Alex</p>
          </div>

          <nav>
            <button className="w-full flex items-center gap-3 px-4 py-3 mt-4 text-red-500 hover:bg-red-50 rounded-xl transition-all">
              <span onClick={handleLogout} className="font-medium">
                Log Out
              </span>
            </button>
          </nav>
        </aside>

        <main className="flex-1 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          {activeTab === "profile" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <section>
                <h2 className="text-xl font-bold mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-gray-400">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Alex Johnson"
                      className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-gray-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="alex@example.com"
                      className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
                <button className="mt-8 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                  Save Changes
                </button>
              </section>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold mb-4">Order History</h2>

              {[1, 2].map((order) => (
                <div
                  key={order}
                  className="border rounded-2xl p-6 hover:border-black transition-colors group cursor-pointer"
                >
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <p className="text-sm font-bold">Order #ORD-202{order}</p>
                      <p className="text-xs text-gray-500">
                        Placed on Dec 12, 2025
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-bold">$145.00</p>
                        <p className="text-[10px] uppercase tracking-wider text-green-600 font-bold">
                          Delivered
                        </p>
                      </div>
                      <div>extra</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
