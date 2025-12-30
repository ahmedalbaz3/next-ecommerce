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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            {tSignup("title")}
          </h1>
          <p className="text-gray-500 mt-2">{tSignup("subtitle")}</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            {tSignup("name")}
            <input
              {...register("name")}
              type="text"
              placeholder={tSignup("name")}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
            />
            {errors.name && <p className="warning">{errors.name.message}</p>}
          </div>

          <div className="relative">
            {tSignup("mail")}
            <input
              {...register("mail")}
              type="email"
              placeholder={tSignup("mail")}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
            />
            {errors.mail && <p className="warning">{errors.mail.message}</p>}
          </div>

          <div className="relative">
            {tSignup("password")}
            <input
              {...register("password")}
              type="password"
              placeholder={tSignup("password")}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
            />
            {errors.password && (
              <p className="warning">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-3 px-2">
              <input
                type="checkbox"
                className="mt-1 accent-black"
                id="terms"
                {...register("acceptTerms")}
              />

              <label
                htmlFor="terms"
                className="text-xs text-gray-500 leading-tight"
              >
                {tSignup("terms")}
                <span className="underline">{tSignup("termsLink")}</span>{" "}
                {tSignup("and")}{" "}
                <span className="underline">{tSignup("privacyLink")}</span>.
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="warning">{errors.acceptTerms.message}</p>
            )}
          </div>

          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all">
            {tSignup("submit")}
          </button>
        </form>

        <p className="text-center text-gray-500">
          {tSignup("hasAccount")}
          <Link
            href="/auth/login"
            className="text-black font-bold hover:underline"
          >
            {tSignup("login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
