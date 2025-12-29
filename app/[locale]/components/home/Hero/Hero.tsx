"use client";
import Button from "@/app/[locale]/components/ui/Button/Button";
import { useAppSelector } from "@/store/actions";
import Link from "next/link";

const Hero = () => {
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);

  return (
    <section className="hero">
      <div className="container mx-auto flex flex-row items-center justify-center h-dvh max-md:px-4">
        <div className="left flex-1 flex flex-col gap-8">
          <h1 className="text-4xl md:text-5xl font-semibold md:font-bold">
            {isRtl
              ? "أناقة خالدة، منسوجة في التقاليد"
              : "Timeless Elegance, Woven in Tradition"}
          </h1>
          <p className="text-md md:text-xl  text-gray-500">
            {isRtl
              ? "إعادة تعريف جوهر الحياة العصرية من خلال مجموعات مختارة وتصاميم خالدة. نحن نمزج بين الحرفية الفنية والجماليات المعاصرة لنقدم لك قطعاً تحاكي تفردك وترتقي بتجربتك اليومية."
              : "Redefining the essence of modern living through curated collections and timeless design. We blend artisanal craftsmanship with contemporary aesthetics to bring you pieces that speak to your individuality and elevate your everyday experience."}
          </p>
          <div className="actions flex flex-col md:flex-row gap-2 mt-4">
            <Link href="/product">
              <Button
                text={isRtl ? "تسوق الان" : "Shop Now"}
                bg="bg-black text-white"
              />
            </Link>
            <Link href="/collections">
              <Button
                text={isRtl ? "تصفح التجميعات" : "Browse Collections"}
                bg="bg-white text-black"
              />
            </Link>
          </div>
        </div>
        <div className="right flex-1 hidden md:block"></div>
      </div>
    </section>
  );
};

export default Hero;
