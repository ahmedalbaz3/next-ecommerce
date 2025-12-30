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
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tCategories = useTranslations("ourCategories");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/categories");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load categories.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {}, []);
  return (
    <section className="max-md:px-4">
      <div className="container py-24 mx-auto relative">
        <h2 className="text-4xl font-semibold text-center mb-12">
          {tCategories("title")}
        </h2>
        <div className=" overflow-x-auto">
          <div className="flex flex-row gap-10 min-w-fit ">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                imageSrc={category.image}
                title={isRtl ? category.name_ar : category.name_en}
                imageAlt={category.name_en}
                slug={category.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
