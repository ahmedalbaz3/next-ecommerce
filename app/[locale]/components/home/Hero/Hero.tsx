"use client";

import Button from "@/app/[locale]/components/ui/Button/Button";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/store/actions";
import { useEffect, useState } from "react";

const Hero = () => {
  const tHero = useTranslations("hero");
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const direction = mounted ? (isRtl ? "rtl" : "ltr") : "ltr";

  return (
    <section
      className="hero bg-white dark:bg-zinc-950 transition-colors duration-500"
      dir={direction}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center min-h-[90vh] max-md:px-4 gap-12">
        <div className="flex-1 flex flex-col gap-6 text-center md:text-start justify-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-black dark:text-white leading-tight">
            {tHero("title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl">
            {tHero("phrase")}
          </p>

          <div className="actions flex flex-col md:flex-row gap-4 mt-6">
            <Link href="/product" className="w-full md:w-auto">
              <Button
                text={tHero("prim")}
                bg="bg-black text-white dark:bg-white dark:text-black w-full transition-all active:scale-95"
              />
            </Link>
            <Link href="/product" className="w-full md:w-auto">
              <Button
                text={tHero("sec")}
                bg="bg-amber-500 text-black border border-gray-200 dark:bg-transparent dark:text-white dark:border-zinc-800 w-full transition-all active:scale-95"
              />
            </Link>
          </div>
        </div>

        <div className="right flex-1 relative hidden md:block w-full h-[500px] rounded-2xl overflow-hidden">
          {mounted && (
            <Image
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
              alt="Hero featured product"
              fill
              priority
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
