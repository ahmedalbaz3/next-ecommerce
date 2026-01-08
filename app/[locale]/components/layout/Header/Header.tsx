import Link from "next/link";
import { ThemeSwitcher } from "../../ui/ThemeSwitcher/ThemeSwitcher";

import SearchComponent from "../../ui/Search/SearchComponent";
import CartCounter from "../../ui/CartCounter/CartCounter";
import LanguageSwitcher from "../../ui/LanguageSwitcher/LanguageSwitcher";
import UserNavigator from "../../ui/UserNavigator/UserNavigator";
import AuthButtons from "../../ui/AuthButtons/AuthButtons";
import MobileMenu from "../../ui/MobileMenu/MobileMenu";
import { getTranslations } from "next-intl/server";

const Header = async () => {
  const t = await getTranslations("header");

  return (
    <header className="bg-white dark:bg-black text-black dark:text-white flex flex-col relative z-50">
      <div className="header-top container mx-auto flex items-center justify-between max-md:px-5 py-5">
        <div className=" flex gap-7 items-center">
          <Link href="/" className="header-logo text-3xl font-semibold">
            May<span className="text-violet-900">Bell</span>
          </Link>
          <ThemeSwitcher />
        </div>

        <SearchComponent />
        <div className="header-act hidden md:flex ">
          <LanguageSwitcher />
          <CartCounter />
          <UserNavigator />
        </div>
        <MobileMenu />
      </div>
      <div className="header-bottom bg-black dark:bg-zinc-900 ">
        <div className="header-bottom-container container mx-auto items-center justify-between max-md:px-5  hidden md:flex text-white ">
          <div className="header-bottom-left flex  gap-5">
            <Link
              href="/product"
              className=" flex gap-3 p-5 bg-amber-500 hover:bg-amber-600 cursor-pointer text-black text-md font-medium items-center"
              aria-label="open menu"
            >
              <span>{t("allCat")}</span>
            </Link>
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
            <AuthButtons />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
