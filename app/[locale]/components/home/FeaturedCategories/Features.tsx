import { getTranslations } from "next-intl/server";
import CategoryCard from "../../ui/CategoryCard/CategoryCard";
import getCategories from "@/lib/getCategories";

const Feature2 = async ({
  params,
}: {
  params: Promise<{ locale: "ar" | "en" }>;
}) => {
  const t = await getTranslations("ourCategories");
  const { locale } = await params;
  const isRtl = locale === "ar";
  const data = await getCategories();
  const categories = data.categories;

  return (
    <section className="dark:bg-black dark:text-white py-10">
      <div className="container mx-auto">
        <h2 className="py-3 text-4xl font-semibold">{t("title")}</h2>
        <div className=" grid grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              imageSrc={category.image}
              imageAlt={category.name_en}
              title={category.name_en}
              slug={category.slug}
              id={category.id}
              name_en={category.name_en}
              name_ar={category.name_ar}
              isRtl={isRtl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature2;
