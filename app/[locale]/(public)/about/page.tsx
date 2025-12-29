// app/[locale]/about/page.tsx

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isAr = locale === "ar";

  return (
    <div
      className="max-w-6xl mx-auto px-4 py-16 space-y-24"
      dir={isAr ? "rtl" : "ltr"}
    >
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          {isAr ? (
            <>
              نعيد تعريف <br /> الحياة العصرية
            </>
          ) : (
            <>
              We redefine <br /> modern living.
            </>
          )}
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
          {isAr
            ? "تأسسنا في عام 2025، ونؤمن بأن الأشياء اليومية يجب أن تكون مزيجاً من الحرفية الاستثنائية والجمال الوظيفي."
            : "Founded in 2025, we believe that everyday objects should be a blend of exceptional craftsmanship and functional beauty."}
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
            alt="Our Studio"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">
            {isAr ? "فلسفتنا" : "Our Philosophy"}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isAr
              ? "نحن لا نبيع المنتجات فحسب؛ بل ننظم التجارب. يتم فحص كل عنصر في مجموعتنا من أجل الاستدامة والمتانة والجمال الخالد."
              : "We don't just sell products; we curate experiences. Every item in our collection is vetted for sustainability, durability, and aesthetic timelessness."}
          </p>
          <div className="grid grid-cols-2 gap-8 pt-6">
            <div>
              <p className="text-3xl font-bold">12k+</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">
                {isAr ? "عميل" : "Customers"}
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">
                {isAr ? "عضوي" : "Organic"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-black text-white rounded-[2rem] p-12 md:p-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { en: "Ethical Sourcing", ar: "مصادر أخلاقية" },
            { en: "Global Shipping", ar: "شحن عالمي" },
            { en: "Lifetime Warranty", ar: "ضمان مدى الحياة" },
          ].map((value, i) => (
            <div key={i} className="space-y-4">
              <span className="text-gray-500 font-mono">0{i + 1}</span>
              <h3 className="text-xl font-bold">
                {isAr ? value.ar : value.en}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {isAr
                  ? "نحن نضمن أن كل خطوة في سلسلة التوريد لدينا تحترم البيئة والعمال."
                  : "We ensure every step of our supply chain respects both the environment and the workers."}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
