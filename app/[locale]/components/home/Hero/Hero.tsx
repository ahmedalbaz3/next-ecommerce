import Button from "@/app/[locale]/components/ui/Button/Button";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Hero = () => {
  const tHero = useTranslations("hero");

  return (
    <section className="hero">
      <div className="container mx-auto flex flex-row items-center justify-center h-dvh max-md:px-4">
        <div className="left flex-1 flex flex-col gap-8">
          <h1 className="text-4xl md:text-5xl font-semibold md:font-bold">
            {tHero("title")}
          </h1>
          <p className="text-md md:text-xl  text-gray-500">{tHero("phrase")}</p>
          <div className="actions flex flex-col md:flex-row gap-2 mt-4">
            <Link href="/product">
              <Button text={tHero("prim")} bg="bg-black text-white" />
            </Link>
            <Link href="/collections">
              <Button text={tHero("sec")} bg="bg-white text-black" />
            </Link>
          </div>
        </div>
        <div className="right flex-1 hidden md:block"></div>
      </div>
    </section>
  );
};

export default Hero;
