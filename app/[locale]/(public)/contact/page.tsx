"use client";

import { useAppSelector } from "@/store/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";

export default function ContactPage() {
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);
  const t = useTranslations("Contact");

  const contactSchema = z.object({
    name: z.string().min(2, { message: t("validation.nameMin") }),
    email: z.string().email({ message: t("validation.emailInvalid") }),
    message: z.string().min(10, { message: t("validation.messageMin") }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(t("form.success"));
    reset();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 py-16" dir={isRtl ? "rtl" : "ltr"}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-black dark:text-white">
                {t("title")}
              </h1>
              <p className="text-gray-500 dark:text-zinc-400 text-lg leading-relaxed max-w-md">
                {t("description")}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-full bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 flex items-center justify-center transition-colors group-hover:bg-black group-hover:dark:bg-white group-hover:text-white group-hover:dark:text-black">
                  <Mail size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 uppercase font-bold tracking-[0.2em]">
                    {t("emailUs")}
                  </p>
                  <p className="font-bold text-xl text-black dark:text-white">
                    hello@yourbrand.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-black/5 dark:shadow-none transition-all">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black dark:text-zinc-300 ml-1">
                    {t("form.name")}
                  </label>
                  <input
                    {...register("name")}
                    placeholder={t("form.namePlaceholder")}
                    className={`w-full p-4 bg-gray-50 dark:bg-zinc-800 border rounded-2xl focus:bg-white dark:focus:bg-zinc-950 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all text-black dark:text-white ${
                      errors.name
                        ? "border-red-500"
                        : "border-transparent dark:border-zinc-700"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs font-medium">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-black dark:text-zinc-300 ml-1">
                    {t("form.email")}
                  </label>
                  <input
                    {...register("email")}
                    placeholder={t("form.emailPlaceholder")}
                    className={`w-full p-4 bg-gray-50 dark:bg-zinc-800 border rounded-2xl focus:bg-white dark:focus:bg-zinc-950 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all text-black dark:text-white ${
                      errors.email
                        ? "border-red-500"
                        : "border-transparent dark:border-zinc-700"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-black dark:text-zinc-300 ml-1">
                  {t("form.message")}
                </label>
                <textarea
                  rows={5}
                  {...register("message")}
                  placeholder={t("form.messagePlaceholder")}
                  className={`w-full p-4 bg-gray-50 dark:bg-zinc-800 border rounded-2xl focus:bg-white dark:focus:bg-zinc-950 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all text-black dark:text-white resize-none ${
                    errors.message
                      ? "border-red-500"
                      : "border-transparent dark:border-zinc-700"
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs font-medium">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                disabled={isSubmitting}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all disabled:bg-zinc-300 dark:disabled:bg-zinc-700 active:scale-[0.98]"
              >
                {isSubmitting ? t("form.sending") : t("form.submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
