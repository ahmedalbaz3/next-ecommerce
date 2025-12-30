"use client";

import { useAppDispatch, useAppSelector } from "@/store/actions";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function AccountPage() {
  const t = useTranslations("Account");
  const [activeTab, setActiveTab] = useState("profile");
  const [mounted, setMounted] = useState(false);

  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);
  const { isAuthenticated, user } = useAppSelector(
    (state) => state.authReducer
  );

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setMounted(true);
    if (mounted && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, mounted, router]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 py-12" dir={isRtl ? "rtl" : "ltr"}>
        <div className="flex flex-col md:flex-row gap-12">
          <aside className="w-full md:w-64 space-y-2">
            <div className="mb-8 px-4">
              <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
                {t("sidebar.title")}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {t("sidebar.welcome", { name: user?.name || "User" })}
              </p>
            </div>

            <nav className="space-y-1">
              <TabButton
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
                label={t("profile.title")}
              />
              <TabButton
                active={activeTab === "orders"}
                onClick={() => setActiveTab("orders")}
                label={t("orders.title")}
              />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 mt-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all duration-300 font-medium cursor-pointer"
              >
                {t("sidebar.logout")}
              </button>
            </nav>
          </aside>

          <main className="flex-1 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 md:p-10 shadow-sm transition-all duration-500">
            {activeTab === "profile" ? (
              <ProfileTab t={t} user={user} />
            ) : (
              <OrdersTab t={t} isRtl={isRtl} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

const TabButton = ({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-start px-4 py-3 rounded-xl transition-all duration-300 font-medium cursor-pointer ${
      active
        ? "bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/10"
        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
    }`}
  >
    {label}
  </button>
);

const ProfileTab = ({ t, user }: any) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <section>
      <h2 className="text-2xl font-bold mb-8 text-black dark:text-white">
        {t("profile.title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputGroup
          label={t("profile.fullName")}
          defaultValue={user?.name || ""}
        />
        <InputGroup
          label={t("profile.email")}
          defaultValue={user?.email || ""}
          type="email"
        />
      </div>
      <button className="mt-10 bg-black dark:bg-white text-white dark:text-black p-5 rounded-2xl text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 active:scale-95 cursor-pointer">
        {t("profile.save")}
      </button>
    </section>
  </div>
);

const InputGroup = ({ label, defaultValue, type = "text" }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 px-1">
      {label}
    </label>
    <input
      type={type}
      defaultValue={defaultValue}
      className="w-full p-4 bg-gray-50 dark:bg-zinc-800 border border-transparent dark:border-zinc-700 rounded-2xl outline-none focus:bg-white dark:focus:bg-zinc-950 focus:ring-2 focus:ring-black dark:focus:ring-white text-black dark:text-white transition-all duration-300"
    />
  </div>
);

const OrdersTab = ({ t, isRtl }: any) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
      {t("orders.title")}
    </h2>
    {[1, 2].map((order) => (
      <div
        key={order}
        className="border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 hover:border-black dark:hover:border-white transition-all duration-300 cursor-pointer group bg-white dark:bg-zinc-900"
      >
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <p className="font-bold text-black dark:text-white">
              {t("orders.orderNumber", { number: `ORD-202${order}` })}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {t("orders.date", { date: "Dec 12, 2025" })}
            </p>
          </div>
          <div
            className={`flex items-center gap-8 ${
              isRtl ? "text-left" : "text-right"
            }`}
          >
            <div>
              <p className="font-bold text-lg text-black dark:text-white">
                $145.00
              </p>
              <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-md font-bold uppercase">
                {t("orders.status")}
              </span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
