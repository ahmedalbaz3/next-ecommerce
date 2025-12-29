"use client";
import { useAppDispatch, useAppSelector } from "@/store/actions";
import {
  loadAuthFromStorage,
  logout,
  setCredentials,
} from "@/store/slices/authSlice";
import {
  loadDirectionFromCookie,
  toggleDirection,
} from "@/store/slices/directionSlice";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const menu = useRef<HTMLDivElement>(null);
  const items = useAppSelector((state) => state.cartReducer.items);
  const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated);
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);

  const cartQuantity = Object.values(items).reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAuthFromStorage());
    dispatch(loadDirectionFromCookie());
  }, [dispatch]);

  // ======= toggle menu =======
  const toggleMenu = () => {
    if (menu.current) {
      menu.current?.classList.toggle("showMenu");
    }
  };

  const router = useRouter();
  const pathname = usePathname();

  // ======= toggle dir =======
  const togglePageDirection = () => {
    const newLocale = isRtl ? "en" : "ar";

    dispatch(toggleDirection());
    const pathSegments = pathname.split("/");
    pathSegments[1] = newLocale;
    const newPath = pathSegments.join("/");
    router.push(newPath);
  };
  const logOut = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-sky-400  top-0 z-50 text-black duration-200 sticky">
      <div
        ref={menu}
        className="absolute left-0 top-full h-screen z-50

w-[70vw] md:w-[25vw] lg:w-[20vw]

bg-black/95 backdrop-blur-md

text-white p-8 shadow-2xl border-r border-white/10

transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]

transform -translate-x-full"
      >
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold">
            Navigation
          </span>
        </div>

        <ul className="flex flex-col gap-8">
          {[
            { name_en: "Products", name_ar: "المنتجات", href: "/product" },
            { name_en: "About", name_ar: "حولنا", href: "/about" },
            { name_en: "Contact", name_ar: "تواصل معنا", href: "/contact" },
          ].map((item) => (
            <li key={item.name_en} className="group overflow-hidden">
              <Link
                href={item.href}
                className="text-2xl md:text-3xl font-light tracking-tight flex items-center gap-4 hover:text-gray-400 transition-colors"
              >
                <span className="h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-8"></span>
                {isRtl ? item.name_ar : item.name_en}
              </Link>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-12 left-8">
          <div className="flex gap-4 text-xs text-gray-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white">
              Instagram
            </a>
            <a href="#" className="hover:text-white">
              Twitter
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex justify-between p-4">
        <div className="left flex items-center gap-4">
          <div className="menu text-3xl cursor-pointer" onClick={toggleMenu}>
            M
          </div>
        </div>
        <div className="logo flex items-center text-3xl cursor-pointer">
          <Link href="/">{isRtl ? "متجر الكتروني" : "E-Commerce"}</Link>
        </div>
        <div className="actions flex items-center gap-4">
          <img
            className="cursor-pointer"
            src="/icons/global.svg"
            alt=""
            width={30}
            height={30}
            onClick={togglePageDirection}
          />
          <Link href="/cart" className="relative">
            <div className="absolute -top-2 -right-2 size-5 flex justify-center items-center text-sm text-white bg-gray-800  rounded-full">
              {cartQuantity}
            </div>
            <img
              className="cursor-pointer"
              src="/icons/cart.svg"
              alt=""
              width={30}
              height={30}
            />
          </Link>
          {isAuth && (
            <Link href="/account">
              <img
                className="cursor-pointer"
                src="/icons/account.svg"
                alt=""
                width={30}
                height={30}
              />
            </Link>
          )}
          {isAuth ? (
            <Link href="/auth/login" onClick={logOut} className="text-red-600">
              {isRtl ? "خروج" : "Logout"}
            </Link>
          ) : (
            <Link href="/auth/login">{isRtl ? "دخول" : "Login"}</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
