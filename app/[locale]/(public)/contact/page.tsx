"use client";

import { useAppSelector } from "@/store/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export default function ContactPage() {
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);

  const contactSchema = z.object({
    name: z.string().min(2, {
      message: isRtl
        ? "الاسم يجب أن يكون حرفين على الأقل"
        : "Name must be at least 2 characters",
    }),
    email: z.email({
      message: isRtl ? "البريد الإلكتروني غير صحيح" : "Invalid email address",
    }),
    message: z.string().min(10, {
      message: isRtl
        ? "الرسالة يجب أن تكون ١٠ أحرف على الأقل"
        : "Message must be at least 10 characters",
    }),
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
    console.log("Form Data:", data);
    alert(isRtl ? "تم إرسال رسالتك بنجاح!" : "Your message has been sent!");
    reset();
  };

  return (
    <div
      className={`max-w-6xl mx-auto px-4 py-16 ${
        isRtl ? "text-right" : "text-left"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">
              {isRtl ? "تواصل معنا." : "Get in touch."}
            </h1>
            <p className="text-gray-500 text-lg">
              {isRtl
                ? "لديك سؤال عن طلب أو تريد فقط التحية؟ يسعدنا التواصل معك."
                : "Have a question about an order or just want to say hi? We'd love to hear from you."}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                📧
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                  {isRtl ? "راسلنا" : "Email us"}
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
                <label className="text-sm font-medium">
                  {isRtl ? "الاسم" : "Name"}
                </label>
                <input
                  {...register("name")}
                  className={`w-full p-4 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all ${
                    errors.name
                      ? "border-red-500 focus:ring-red-200"
                      : "border-transparent"
                  }`}
                  placeholder={isRtl ? "اسمك الكامل" : "Your full name"}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {isRtl ? "البريد" : "Email"}
                </label>
                <input
                  {...register("email")}
                  className={`w-full p-4 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all ${
                    errors.email
                      ? "border-red-500 focus:ring-red-200"
                      : "border-transparent"
                  }`}
                  placeholder={isRtl ? "بريدك الإلكتروني" : "Your email"}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {isRtl ? "الرسالة" : "Message"}
              </label>
              <textarea
                rows={5}
                {...register("message")}
                className={`w-full p-4 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all ${
                  errors.message
                    ? "border-red-500 focus:ring-red-200"
                    : "border-transparent"
                }`}
                placeholder={isRtl ? "كيف يمكننا مساعدتك؟" : "How can we help?"}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs">{errors.message.message}</p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              className="w-full bg-black text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all disabled:bg-gray-400"
            >
              {isSubmitting ? "..." : isRtl ? "إرسال الرسالة" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
