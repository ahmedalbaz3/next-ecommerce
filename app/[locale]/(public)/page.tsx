import Features from "@/app/[locale]/components/home/FeaturedCategories/Features";
import Hero from "@/app/[locale]/components/home/Hero/Hero";
import ProductsHome from "@/app/[locale]/components/home/ProductsHome/ProductsHome";
import Offer from "../components/home/Offer/Offer";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  return (
    <main>
      <Hero />
      <Features params={params} />
      <Offer />
      <ProductsHome />
    </main>
  );
}
