import AddToCart from "@/app/[locale]/components/ui/AddToCart/AddToCart";
import { TProduct } from "@/types/TProduct";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

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

async function getProduct(id: string): Promise<TProduct> {
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

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string; locale: "ar" | "en" }>;
}) {
  const tProductPage = await getTranslations("productPage");

  const { id, locale } = await params;
  const isRtl = locale === "ar" ? true : false;

  const product = await getProduct(id);
  const {
    image,
    name_en,
    name_ar,
    description_ar,
    description_en,
    price,
    sizes,
    inStock,
  } = product;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: isRtl ? name_ar : name_en,
    image: image,
    description: isRtl ? description_ar : description_en,
    brand: {
      "@type": "Brand",
      name: isRtl ? name_ar : name_en,
    },
    offers: {
      "@type": "Offer",
      url: `https://example.com/products/${id}`,
      priceCurrency: "USD",
      price: price,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main className="p-8">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
          <Link
            href="/product"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 transition-colors"
          >
            {tProductPage("back")}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
            <div className="space-y-4">
              <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-gray-100">
                <img
                  src={image}
                  alt={`${isRtl ? name_ar : name_en} `}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  fetchPriority="high"
                />
              </div>
            </div>

            <div className="lg:sticky lg:top-24 h-fit space-y-8">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">
                  {isRtl ? name_ar : name_en}
                </h1>
                <div className="flex items-center gap-4">
                  <p className="text-2xl font-medium">${price.toFixed(2)}</p>
                  <div className="flex items-center gap-1 border-l pl-4">
                    <span className="text-sm font-bold">4.6</span>
                    <span className="text-sm text-gray-400">
                      ({170} {tProductPage("review")})
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {isRtl ? description_ar : description_en}
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <AddToCart
                    id={id}
                    price={price}
                    style="w-full bg-black text-white"
                    dir={isRtl ? "rtl" : "ltr"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-8 border-t">
                <div className="flex gap-4 items-start">
                  <div>
                    <p className="text-sm font-bold">
                      {tProductPage("shipping")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {tProductPage("shippingDetails")}
                      $150
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div>
                    <p className="text-sm font-bold">
                      2- {tProductPage("rules")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {tProductPage("rulesDetails")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
