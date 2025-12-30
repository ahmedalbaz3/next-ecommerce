"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EMAIL_REGEX } from "../login/page";
import { setCredentials } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function SignupPage() {
  const tSignup = useTranslations("Signup");
  const tLogin = useTranslations("Login");

  const signUp = z.object({
    name: z.string().min(7, tSignup("validation.name")),
    mail: z
      .email(tLogin("validation.mailFormat"))
      .regex(EMAIL_REGEX, tLogin("validation.mailSecurity")),

    password: z
      .string()
      .min(8, tLogin("validation.passMin"))
      .regex(/[A-Z]/, tLogin("validation.passUpper"))
      .regex(/[0-9]/, tLogin("validation.passNumber")),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, tSignup("validation.terms")),
  });

  type signUpT = z.infer<typeof signUp>;

  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<signUpT>({
    resolver: zodResolver(signUp),
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data: signUpT) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.mail,
          name: data.name,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      dispatch(setCredentials(result));
      reset();
      console.log("Signup successful:", result.message);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white dark:bg-zinc-950 transition-colors duration-500">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
            {tSignup("title")}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-2">
            {tSignup("subtitle")}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative text-sm font-medium text-black dark:text-zinc-300">
            {tSignup("name")}
            <input
              {...register("name")}
              type="text"
              placeholder={tSignup("name")}
              className={`w-full px-4 py-4 bg-gray-50 dark:bg-zinc-900 border rounded-2xl focus:bg-white dark:focus:bg-zinc-950 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all duration-300 text-black dark:text-white mt-1 ${
                errors.name
                  ? "border-red-500"
                  : "border-transparent dark:border-zinc-800"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 px-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="relative text-sm font-medium text-black dark:text-zinc-300">
            {tSignup("mail")}
            <input
              {...register("mail")}
              type="email"
              placeholder={tSignup("mail")}
              className={`w-full px-4 py-4 bg-gray-50 dark:bg-zinc-900 border rounded-2xl focus:bg-white dark:focus:bg-zinc-950 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all duration-300 text-black dark:text-white mt-1 ${
                errors.mail
                  ? "border-red-500"
                  : "border-transparent dark:border-zinc-800"
              }`}
            />
            {errors.mail && (
              <p className="text-red-500 text-xs mt-1 px-1">
                {errors.mail.message}
              </p>
            )}
          </div>

          <div className="relative text-sm font-medium text-black dark:text-zinc-300">
            {tSignup("password")}
            <input
              {...register("password")}
              type="password"
              placeholder={tSignup("password")}
              className={`w-full px-4 py-4 bg-gray-50 dark:bg-zinc-900 border rounded-2xl focus:bg-white dark:focus:bg-zinc-950 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all duration-300 text-black dark:text-white mt-1 ${
                errors.password
                  ? "border-red-500"
                  : "border-transparent dark:border-zinc-800"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 px-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-3 px-2">
              <input
                type="checkbox"
                className="mt-1 accent-black dark:accent-white h-4 w-4 cursor-pointer"
                id="terms"
                {...register("acceptTerms")}
              />

              <label
                htmlFor="terms"
                className="text-xs text-gray-500 dark:text-zinc-400 leading-tight cursor-pointer"
              >
                {tSignup("terms")}{" "}
                <span className="underline text-black dark:text-white">
                  {tSignup("termsLink")}
                </span>{" "}
                {tSignup("and")}{" "}
                <span className="underline text-black dark:text-white">
                  {tSignup("privacyLink")}
                </span>
                .
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-red-500 text-xs mt-1 px-1">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>

          <button className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold hover:bg-gray-800 dark:hover:bg-zinc-200 transition-all duration-300 active:scale-[0.98] cursor-pointer">
            {tSignup("submit")}
          </button>
        </form>

        <p className="text-center text-gray-500 dark:text-zinc-500">
          {tSignup("hasAccount")}{" "}
          <Link
            href="/auth/login"
            className="text-black dark:text-white font-bold hover:underline"
          >
            {tSignup("login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
