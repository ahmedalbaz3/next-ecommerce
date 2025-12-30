import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className=" min-h-screen transition-colors duration-500 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-16 space-y-24">
        <section className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black dark:text-white">
            {t("title")}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {t("description")}
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/5] bg-gray-100 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
              alt="Our Studio"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-black dark:text-white tracking-tight">
              {t("philosophy.title")}
            </h2>
            <p className="text-gray-600 dark:text-zinc-400 leading-relaxed text-lg">
              {t("philosophy.description")}
            </p>

            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
              <div>
                <p className="text-4xl font-black text-black dark:text-white">
                  12k+
                </p>
                <p className="text-xs text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em] mt-2 font-bold">
                  {t("philosophy.stats.customers")}
                </p>
              </div>
              <div>
                <p className="text-4xl font-black text-black dark:text-white">
                  100%
                </p>
                <p className="text-xs text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em] mt-2 font-bold">
                  {t("philosophy.stats.organic")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black dark:bg-zinc-900 text-white rounded-[2.5rem] p-10 md:p-20 border border-transparent dark:border-zinc-800 transition-all duration-500 shadow-2xl shadow-black/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {["ethical", "shipping", "warranty"].map((key, i) => (
              <div key={key} className="group space-y-4">
                <span className="text-zinc-500 font-mono text-sm block transition-colors group-hover:text-white/50">
                  0{i + 1}
                </span>
                <h3 className="text-xl font-bold tracking-tight">
                  {t(`values.${key}.title`)}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-200 transition-colors">
                  {t(`values.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
