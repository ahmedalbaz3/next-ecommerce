import { TProduct } from "@/types/TProduct";

export default async function getProductsByCategory(
  slug: string
): Promise<TProduct[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  const allProducts: TProduct[] = data.products;

  return allProducts.filter((product) => product.categoryId === slug);
}
