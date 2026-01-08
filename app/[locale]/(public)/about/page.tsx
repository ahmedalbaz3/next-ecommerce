import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className=" min-h-screen transition-colors duration-500 bg-white dark:bg-zinc-950">
      <div className="about-panner w-full md:h-125 overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-zinc-900 relative">
        <Image
          src={"/images/about-cover.jpg"}
          alt="About us"
          className="object-contain w-full"
          width={800}
          height={500}
        />
        <section className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-2xl md:text-7xl font-black tracking-tighter text-white ">
            {t("title")}
          </h1>
          <p className="text-white dark:text-zinc-400 max-w-2xl mx-auto text-xs md:text-[16px] leading-relaxed">
            {t("description")}
          </p>
        </section>
      </div>
      <div className="container mx-auto px-4 py-16 space-y-24">
        <section className=" text-center ">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-black dark:text-white tracking-tight">
              {t("philosophy.title")}
            </h2>
            <p className="text-gray-600 dark:text-zinc-400 leading-relaxed text-lg">
              {t("philosophy.description")}
            </p>
          </div>
        </section>
        <section className="our-mission grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Image
            src={"/images/about-1.jpg"}
            width={600}
            height={600}
            alt="mission"
          />

          <div className="text dark:text-white">
            <h2 className="text-xl md:text-3xl mb-5">{t("mission.title")}</h2>
            <p className="text-sm">{t("mission.description")}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
