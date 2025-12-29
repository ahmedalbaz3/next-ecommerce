"use client";
import { fetchCategories } from "@/api/api";
import CategoryCard from "@/app/[locale]/components/ui/CategoryCard/CategoryCard";
import { useAppSelector } from "@/store/actions";
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
  const [loading, setLoading] = useState(true);
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
  return (
    <section className="max-md:px-4">
      <div className="container py-24 mx-auto relative">
        <h2 className="text-4xl font-semibold text-center mb-12">
          {isRtl ? "التصنيفات" : "Our Categories"}
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
