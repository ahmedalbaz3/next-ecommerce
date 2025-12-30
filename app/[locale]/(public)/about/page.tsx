import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-24">
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
          {t("description")}
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
          <h2 className="text-3xl font-bold">{t("philosophy.title")}</h2>
          <p className="text-gray-600 leading-relaxed">
            {t("philosophy.description")}
          </p>
          <div className="grid grid-cols-2 gap-8 pt-6">
            <div>
              <p className="text-3xl font-bold">12k+</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">
                {t("philosophy.stats.customers")}
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">
                {t("philosophy.stats.organic")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white rounded-[2rem] p-12 md:p-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {["ethical", "shipping", "warranty"].map((key, i) => (
            <div key={key} className="space-y-4">
              <span className="text-gray-500 font-mono">0{i + 1}</span>
              <h3 className="text-xl font-bold">{t(`values.${key}.title`)}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t(`values.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
