"use client";
import { Menu, ShoppingBag, User, Globe, Search } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "../../ui/ThemeSwitcher/ThemeSwitcher";
import {
  loadDirectionFromCookie,
  toggleDirection,
} from "@/store/slices/directionSlice";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/actions";
import { useTranslations } from "next-intl";
import { loadAuthFromStorage, logout } from "@/store/slices/authSlice";
import { useEffect, useState } from "react";
import { TProduct } from "@/types/TProduct";
import Image from "next/image";

const Header = () => {
  const t = useTranslations("header");
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const items = useAppSelector((state) => state.cartReducer.items);
  const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated);
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);
  const cartQuantity = Object.values(items).reduce(
    (acc, curr) => acc + curr,
    0
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAuthFromStorage());
    dispatch(loadDirectionFromCookie());
  }, [dispatch]);
  useEffect(() => {
    setIsOpen(false);
    setQuery("");
  }, [pathname]);

  // =========== Search ===========
  const [results, setResults] = useState<TProduct[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log(results);
  }, [results]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        fetchResults(query);
      } else {
        setResults([]);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const fetchResults = async (term: string) => {
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // =========== Helpers ===========
  const togglePageDirection = () => {
    const newLocale = isRtl ? "en" : "ar";
    dispatch(toggleDirection());
    const pathSegments = pathname.split("/");
    pathSegments[1] = newLocale;
    router.push(pathSegments.join("/"));
  };
  return (
    <header className="bg-white dark:bg-black text-black dark:text-white flex flex-col relative z-10">
      <div className="header-top container mx-auto flex items-center justify-between max-md:px-5 py-5">
        <div className=" flex gap-7">
          <Link href="/" className="header-logo text-3xl font-semibold">
            May<span className="text-violet-900">Bell</span>
          </Link>
          <ThemeSwitcher />
        </div>

        <button
          className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer text-black dark:text-white md:hidden"
          aria-label="Open Menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={26} strokeWidth={1.5} />
        </button>
        <form
          action="search"
          className="w-2/5 items-center  border border-gray-400 hidden md:flex relative"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="icon px-3 py-2 ">
            <Search width={15} />
          </div>
          <input
            type="text"
            name="search"
            placeholder={t("search")}
            className="py-2 outline-0 w-11/12"
            role="search box"
            onChange={(e) => setQuery(e.target.value)}
          />
          <label htmlFor="search" className="hidden">
            Search
          </label>
          <button
            type="submit"
            className="py-2 px-3 bg-amber-400 hover:text-white  text-black font-medium cursor-pointer"
          >
            {t("search")}
          </button>
          {results.length > 0 && (
            <div className="w-full p-5 bg-black absolute top-full text-white flex flex-col gap-5">
              {results.slice(0, 10).map((result) => (
                <Link
                  href={`/product/${result.id}`}
                  key={result.id}
                  className="reult flex gap-5 items-center"
                >
                  <Image
                    src={result.image}
                    width={50}
                    height={50}
                    alt={result.name_en}
                  />
                  <p>
                    <span className="text-yellow-400 text-xl font-semibold">
                      {isRtl ? result.name_ar : result.name_en}:{" "}
                    </span>
                    {isRtl ? result.description_ar : result.description_en}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </form>
        <div className="header-act hidden md:flex ">
          <button
            onClick={togglePageDirection}
            className="header-actions text-black dark:text-white"
            aria-label="Change Language"
          >
            <Globe size={22} strokeWidth={1.5} />
          </button>
          <Link href="/cart " className="header-actions relative">
            <ShoppingBag />
            {isAuth && cartQuantity > 0 && (
              <span className="absolute top-1 right-1 size-4 bg-black dark:bg-white text-white dark:text-black text-[10px] flex items-center justify-center rounded-full font-bold">
                {cartQuantity}
              </span>
            )}
          </Link>
          {isAuth && (
            <Link href="account" className="header-actions">
              <User />
            </Link>
          )}
        </div>
      </div>
      <div className="header-bottom bg-violet-900">
        <div className="header-bottom-container container mx-auto items-center justify-between max-md:px-5  hidden md:flex text-white">
          <div className="header-bottom-left flex  gap-5">
            <button
              className=" flex gap-3 p-5 bg-amber-500 hover:bg-amber-500 cursor-pointer text-black text-md font-medium items-center"
              aria-label="open menu"
            >
              <Menu />
              <span>{t("allCat")}</span>
            </button>
            <nav>
              <ul className="flex gap-8 py-5">
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
          </div>
          <div className="header-bottom-right">
            {isAuth ? (
              <>
                <Link
                  href="/auth/login"
                  className="header-links text-red-600"
                  onClick={() => dispatch(logout())}
                >
                  {t("logout")}
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="header-links">
                  {t("login")}
                </Link>
                |
                <Link href="/auth/signup" className="header-links">
                  {t("signup")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-nav md:hidden absolute top-full left-0 w-full h-dvh bg-white dark:bg-black dark:text-white flex flex-col items-center gap-8">
          <div className="header-act flex ">
            <button
              onClick={togglePageDirection}
              className="header-actions text-black dark:text-white"
              aria-label="Change Language"
            >
              <Globe size={22} strokeWidth={1.5} />
            </button>
            <Link href="/cart " className="header-actions relative">
              <ShoppingBag />
              {isAuth && cartQuantity > 0 && (
                <span className="absolute top-1 right-1 size-4 bg-black dark:bg-white text-white dark:text-black text-[10px] flex items-center justify-center rounded-full font-bold">
                  {cartQuantity}
                </span>
              )}
            </Link>
            <Link href="account" className="header-actions">
              <User />
            </Link>
          </div>
          <form
            action="search"
            className="w-2/3 items-center  border border-gray-400 flex"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="icon px-3 py-2 ">
              <Search width={15} />
            </div>
            <input
              type="text"
              name="search"
              placeholder={t("search")}
              className="py-2 outline-0 w-11/12"
              role="search box"
            />
            <label htmlFor="search" className="hidden">
              {t("search")}
            </label>

            <button
              type="submit"
              className="py-2 px-3 bg-amber-400 hover:text-white  text-black font-medium cursor-pointer"
            >
              {t("search")}
            </button>
          </form>
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
            {isAuth ? (
              <>
                <Link
                  href="/auth/login"
                  className="header-links text-red-600"
                  onClick={() => dispatch(logout())}
                >
                  {t("logout")}
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="header-links">
                  {t("login")}
                </Link>
                |
                <Link href="/auth/signup" className="header-links">
                  {t("signup")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
