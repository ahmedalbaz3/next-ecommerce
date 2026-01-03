import { TProduct } from "@/types/TProduct";

const quite = {
  id: "p1",
  slug: "basic-tee",
  name_en: "Basic Tee",
  name_ar: "تي شيرت أساسي",
  price: 19.99,
  categoryId: "c1",
  image: "/products/shoe.jpg",
  description_en: "Soft cotton everyday tee.",
  description_ar: "تي شيرت قطني ناعم للاستخدام اليومي.",
  inStock: true,
  sizes: ["S", "M", "L", "XL"],
};

export default async function getProduct(id: string): Promise<TProduct> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (res.status === 404) return quite as TProduct;
  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
}
