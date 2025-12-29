import Features from "@/app/[locale]/components/home/FeaturedCategories/Features";
import Hero from "@/app/[locale]/components/home/Hero/Hero";
import ProductsHome from "@/app/[locale]/components/home/ProductsHome/ProductsHome";

export default function Page() {
  return (
    <main>
      <Hero />
      <Features />
      <ProductsHome />
    </main>
  );
}
