"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/actions";
import { setCredentials } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export const EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

export default function LoginPage() {
  const t = useTranslations("Login");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );

  const logInSchema = z.object({
    mail: z
      .email(t("validation.mailFormat"))
      .regex(EMAIL_REGEX, t("validation.mailSecurity")),
    password: z
      .string()
      .min(8, t("validation.passMin"))
      .regex(/[A-Z]/, t("validation.passUpper"))
      .regex(/[0-9]/, t("validation.passNumber")),
  });

  type logInT = z.infer<typeof logInSchema>;

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<logInT>({
    resolver: zodResolver(logInSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: logInT) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.mail, password: data.password }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Error");

      dispatch(setCredentials(result));
      router.push("/");
      reset();
    } catch (error: any) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-zinc-950 transition-colors duration-500"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white transition-colors">
            {t("title")}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-2 transition-colors">
            {t("subtitle")}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <label className="text-sm font-medium px-1 text-black dark:text-zinc-300">
              {t("mail")}
            </label>
            <input
              {...register("mail")}
              type="email"
              placeholder={t("mailPlaceholder")}
              className={`w-full px-4 py-4 bg-gray-50 dark:bg-zinc-900 border rounded-2xl focus:bg-white dark:focus:bg-zinc-950 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all duration-300 text-black dark:text-white ${
                errors.mail
                  ? "border-red-500"
                  : "border-transparent dark:border-zinc-800"
              }`}
            />
            {errors.mail && (
              <p className="text-red-500 text-xs px-1 font-medium">
                {errors.mail.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium px-1 text-black dark:text-zinc-300">
              {t("password")}
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder={t("passwordPlaceholder")}
              className={`w-full px-4 py-4 bg-gray-50 dark:bg-zinc-900 border rounded-2xl focus:bg-white dark:focus:bg-zinc-950 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all duration-300 text-black dark:text-white ${
                errors.password
                  ? "border-red-500"
                  : "border-transparent dark:border-zinc-800"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs px-1 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className={`flex ${isRtl ? "justify-start" : "justify-end"}`}>
            <button
              type="button"
              className="text-sm font-medium text-black dark:text-zinc-400 hover:underline cursor-pointer"
            >
              {t("forgotPassword")}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-zinc-200 transition-all transform active:scale-[0.98] cursor-pointer"
          >
            {t("submit")}
          </button>
        </form>

        <p className="text-center text-gray-500 dark:text-zinc-500">
          {t("noAccount")}{" "}
          <Link
            href="/auth/signup"
            className="text-black dark:text-white font-bold hover:underline"
          >
            {t("createOne")}
          </Link>
        </p>
      </div>
    </div>
  );
}
