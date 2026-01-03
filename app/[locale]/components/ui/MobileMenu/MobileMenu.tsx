"use client";

import { useTranslations } from "next-intl";
import AuthButtons from "../AuthButtons/AuthButtons";
import { useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import CartCounter from "../CartCounter/CartCounter";
import UserNavigator from "../UserNavigator/UserNavigator";
import Link from "next/link";
import SearchComponent from "../Search/SearchComponent";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/store/actions";
import { loadAuthFromStorage } from "@/store/slices/authSlice";
import { loadDirectionFromCookie } from "@/store/slices/directionSlice";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("header");
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAuthFromStorage());
    dispatch(loadDirectionFromCookie());
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <>
      {" "}
      <button
        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer text-black dark:text-white md:hidden"
        aria-label="Open Menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={26} strokeWidth={1.5} />
      </button>
      {isOpen && (
        <div className="mobile-nav md:hidden absolute top-full left-0 w-full h-dvh bg-white dark:bg-black dark:text-white flex flex-col items-center gap-8">
          <div className="header-act flex ">
            <LanguageSwitcher />
            <CartCounter />

            <UserNavigator />
          </div>
          <SearchComponent />
          <nav>
            <ul className="flex flex-col items-center gap-8 py-5">
              <li>
                <Link href="/" className="header-links">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="header-links">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="header-links ">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header-bottom-right">
            <AuthButtons />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
