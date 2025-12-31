import { Facebook, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const Footer = async () => {
  const t = await getTranslations("Footer");

  return (
    <footer className="w-full bg-white dark:bg-black text-center pt-10 text-2xl dark:text-white border-t border-t-[0.3px] dark:border-zinc-800">
      <div className="container max-lg:px-5 mx-auto footer-top flex flex-col xl:flex-row items-start lg:items-center justify-between gap-20 pb-10">
        <div className="footer-left flex-2 flex flex-col gap-5 items-start ">
          <Link href="/" className="header-logo text-3xl font-semibold">
            {t("brand.first")}
            <span className="text-violet-900">{t("brand.second")}</span>
          </Link>
          <p className="text-xl text-left rtl:text-right">{t("description")}</p>
          <div className="social">
            <ul className="flex gap-3">
              <li>
                <Link href="/">
                  <Github />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Linkedin />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Facebook />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-right flex-3 grid grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-10 xl:gap-y-0 xl:gap-x-0 text-left rtl:text-right">
          {["features", "support", "company", "legal"].map((section) => (
            <div key={section} className="col">
              <div className="col-head font-bold mb-2">
                {t(`sections.${section}`)}
              </div>
              <div className="col-body">
                <ul className="text-lg flex flex-col gap-1">
                  <li>{t("links.marketing")}</li>
                  <li>{t("links.commerce")}</li>
                  <li>{t("links.analytics")}</li>
                  <li>{t("links.merchandise")}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom bg-amber-400/80 dark:bg-amber-600/50 py-2 w-full">
        <div className="container max-lg:px-5 mx-auto flex justify-between text-base dark:text-zinc-100">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
