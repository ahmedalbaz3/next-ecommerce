import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Offer = () => {
  const t = useTranslations("Offer");

  return (
    <section className="py-10 dark:bg-black">
      <div className="container mx-auto flex flex-col md:flex-row items-stretch overflow-hidden rounded-xl">
        <div className="offer flex-1 flex flex-col justify-center gap-5 bg-violet-900 text-white p-10 text-left rtl:text-right">
          <p className="tracking-widest uppercase">{t("exclusive")}</p>
          <h2 className="text-5xl text-amber-400 font-semibold">
            {t("discount")}
          </h2>
          <p className="flex flex-col font-medium text-xl">
            <span>{t("category_line1")}</span>
            <span>{t("category_line2")}</span>
          </p>
          <Link href="/product">
            <button
              className="p-4 cursor-pointer w-fit md:w-48 
              transition-all duration-300 ease-in-out bg-amber-400
              hover:bg-amber-300 text-black
              whitespace-nowrap font-bold active:scale-95"
            >
              {t("button")}
            </button>
          </Link>
        </div>

        <div className="image hidden md:block relative basis-full md:basis-1/3 shrink-0 aspect-square md:aspect-auto min-h-[300px]">
          <Image
            src="/images/offer.jpeg"
            alt={t("alt")}
            fill
            className="object-cover transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>
    </section>
  );
};

export default Offer;
