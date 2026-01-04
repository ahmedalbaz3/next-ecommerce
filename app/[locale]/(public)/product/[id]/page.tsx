import AddToCart from "@/app/[locale]/components/ui/AddToCart/AddToCart";
import { TProduct } from "@/types/TProduct";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image"; // Added for performance
import getProduct from "@/lib/getProductById";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string; locale: "ar" | "en" }>;
}) {
  const tProductPage = await getTranslations("productPage");

  const { id, locale } = await params;
  const isRtl = locale === "ar";

  const product = await getProduct(id);
  const {
    image,
    name_en,
    name_ar,
    description_ar,
    description_en,
    price,
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
      name: "YourBrand",
    },
    offers: {
      "@type": "Offer",
      url: `https://yourdomain.com/product/${id}`,
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

      <main
        className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
          <Link
            href="/product"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-white mb-8 transition-colors group"
          >
            <span className={isRtl ? "rotate-180" : ""}>←</span>
            {tProductPage("back")}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
                <Image
                  src={image}
                  alt={isRtl ? name_ar : name_en}
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="lg:sticky lg:top-24 h-fit space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black dark:text-white">
                  {isRtl ? name_ar : name_en}
                </h1>
                <div className="flex items-center gap-6">
                  <p className="text-3xl font-bold text-black dark:text-white">
                    ${price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 border-l dark:border-zinc-800 pl-6">
                    <span className="text-sm font-black dark:text-white">
                      4.6
                    </span>
                    <span className="text-sm text-gray-400 dark:text-zinc-500">
                      ({170} {tProductPage("review")})
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-zinc-400 text-lg leading-relaxed">
                {isRtl ? description_ar : description_en}
              </p>

              <div className="space-y-4 pt-4">
                <AddToCart
                  inStock={inStock}
                  id={id}
                  price={price}
                  style="w-full bg-black text-black dark:bg-white dark:text-black py-5 rounded-2xl font-bold transition-all active:scale-95 text-center"
                  dir={isRtl ? "rtl" : "ltr"}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 pt-8 border-t border-gray-100 dark:border-zinc-800">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center text-xl">
                    🚚
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black dark:text-white">
                      {tProductPage("shipping")}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-zinc-500 font-medium">
                      {tProductPage("shippingDetails")} $150
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center text-xl">
                    🔄
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black dark:text-white">
                      {tProductPage("rules")}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-zinc-500 font-medium">
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
