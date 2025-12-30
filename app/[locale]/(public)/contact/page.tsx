"use client";

import { useAppSelector } from "@/store/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);
  const t = useTranslations("Contact");

  const contactSchema = z.object({
    name: z.string().min(2, { message: t("validation.nameMin") }),
    email: z.email({ message: t("validation.emailInvalid") }),
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
    <div className="max-w-6xl mx-auto px-4 py-16" dir={isRtl ? "rtl" : "ltr"}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">{t("title")}</h1>
            <p className="text-gray-500 text-lg">{t("description")}</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                📧
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                  {t("emailUs")}
                </p>
                <p className="font-medium text-lg">hello@yourbrand.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[2rem] shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("form.name")}</label>
                <input
                  {...register("name")}
                  placeholder={t("form.namePlaceholder")}
                  className={`w-full p-4 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all ${
                    errors.name ? "border-red-500" : "border-transparent"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("form.email")}</label>
                <input
                  {...register("email")}
                  placeholder={t("form.emailPlaceholder")}
                  className={`w-full p-4 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all ${
                    errors.email ? "border-red-500" : "border-transparent"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("form.message")}</label>
              <textarea
                rows={5}
                {...register("message")}
                placeholder={t("form.messagePlaceholder")}
                className={`w-full p-4 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all ${
                  errors.message ? "border-red-500" : "border-transparent"
                }`}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs">{errors.message.message}</p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              className="w-full bg-black text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all disabled:bg-gray-400"
            >
              {isSubmitting ? t("form.sending") : t("form.submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
