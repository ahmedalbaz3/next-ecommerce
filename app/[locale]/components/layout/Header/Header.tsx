"use client";
import { useAppDispatch, useAppSelector } from "@/store/actions";
import { logout, loadAuthFromStorage } from "@/store/slices/authSlice";
import {
  toggleDirection,
  loadDirectionFromCookie,
} from "@/store/slices/directionSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, ShoppingBag, User, Globe, LogOut } from "lucide-react";

const Header = () => {
  const t = useTranslations("header");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const items = useAppSelector((state) => state.cartReducer.items);
  const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated);
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);

  const cartQuantity = Object.values(items).reduce(
    (acc, curr) => acc + curr,
    0
  );

  useEffect(() => {
    dispatch(loadAuthFromStorage());
    dispatch(loadDirectionFromCookie());
  }, [dispatch]);

  const togglePageDirection = () => {
    const newLocale = isRtl ? "en" : "ar";
    dispatch(toggleDirection());
    const pathSegments = pathname.split("/");
    pathSegments[1] = newLocale;
    router.push(pathSegments.join("/"));
  };

  const menuTaps = [
    { name: t("products"), href: `/${isRtl ? "ar" : "en"}/product` },
    { name: t("about"), href: "/about" },
    { name: t("contact"), href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-[60] w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={t("aria.openMenu")}
          >
            <Menu size={26} strokeWidth={1.5} />
          </button>

          <Link
            href="/"
            className="text-2xl font-black tracking-tighter hover:opacity-70 transition-opacity"
          >
            {t("logo")}
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={togglePageDirection}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Globe size={22} strokeWidth={1.5} />
            </button>

            <Link
              href="/cart"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              aria-label={t("aria.viewCart")}
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {isAuth && cartQuantity > 0 && (
                <span className="absolute top-1 right-1 size-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                  {cartQuantity}
                </span>
              )}
            </Link>

            {isAuth ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/account"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <User size={22} strokeWidth={1.5} />
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="hidden sm:block text-sm font-medium text-red-500 hover:text-red-700"
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-sm font-bold px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all"
              >
                {t("login")}
              </Link>
            )}
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <nav
          className={`absolute top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col p-8
          ${
            isRtl
              ? isOpen
                ? "left-0"
                : "translate-x-full"
              : isOpen
              ? "left-0"
              : "-translate-x-full"
          }`}
          dir={isRtl ? "rtl" : "ltr"}
        >
          <div className="flex items-center justify-between mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">
              {t("logo")}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <ul className="flex-1 space-y-6">
            {menuTaps.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold tracking-tight hover:ps-4 transition-all duration-300 block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-8 border-t border-gray-100 space-y-4">
            {isAuth && (
              <button
                onClick={() => {
                  dispatch(logout());
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 text-red-500 font-bold"
              >
                <LogOut size={20} /> {t("logout")}
              </button>
            )}
            <div className="flex gap-4 text-xs text-gray-400 font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-black transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-black transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
