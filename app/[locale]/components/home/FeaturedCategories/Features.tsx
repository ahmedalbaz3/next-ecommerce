"use client";
import CategoryCard from "@/app/[locale]/components/ui/CategoryCard/CategoryCard";
import { useAppSelector } from "@/store/actions";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface categoriesType {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  image: string;
}

const FeaturedCategories = () => {
  const [categories, setCategories] = useState<categoriesType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);
  const tCategories = useTranslations("ourCategories");

  useEffect(() => {
    setMounted(true);
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        setError("Failed to load categories.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (!mounted) return null;

  return (
    <section className="bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden">
      <div className="container py-24 mx-auto max-md:px-4">
        <div className="flex flex-col items-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black dark:text-white text-center">
            {tCategories("title")}
          </h2>
          <div className="h-1.5 w-12 bg-black dark:bg-white rounded-full"></div>
        </div>

        {isLoading ? (
          <div className="flex gap-10 overflow-hidden py-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="min-w-[280px] h-[380px] bg-gray-100 dark:bg-zinc-900 rounded-3xl animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500 font-medium">
            {error}
          </div>
        ) : (
          <div
            className="flex flex-row gap-8 md:gap-12 overflow-x-auto pb-8 no-scrollbar scroll-smooth"
            dir={isRtl ? "rtl" : "ltr"}
          >
            {categories.map((category, index) => (
              <div key={category.id || index} className="min-w-fit">
                <CategoryCard
                  imageSrc={category.image}
                  title={isRtl ? category.name_ar : category.name_en}
                  imageAlt={category.name_en}
                  slug={category.slug}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCategories;
