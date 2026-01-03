const quite = {
  categories: [
    {
      id: "c1",
      slug: "apparel",
      name_en: "Apparel",
      name_ar: "ملابس",
      image: "/images/headphone.svg",
    },
  ],
};

export default async function getCategories(): Promise<{
  categories: Tcategory[];
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/`,
    {
      cache: "no-store",
    }
  );

  if (res.status === 404) return quite as { categories: Tcategory[] };
  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
}
