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

const signUp = z.object({
  name: z.string().min(7, "Use a real name"),
  mail: z.email({ pattern: EMAIL_REGEX }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms"),
});

type signUpT = z.infer<typeof signUp>;

export default function SignupPage() {
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.mail,
          name: data.name,
          password: data.password,
        }),
      });

      if (!response.ok) throw new Error("Registration failed");

      const result = await response.json(); // { user, token }

      dispatch(setCredentials(result));
      reset();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Join us</h1>
          <p className="text-gray-500 mt-2">
            Start your premium shopping journey today
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            username
            <input
              {...register("name")}
              type="text"
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
            />
            {errors.name && <p className="warning">{errors.name.message}</p>}
          </div>

          <div className="relative">
            Email
            <input
              {...register("mail")}
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
            />
            {errors.mail && <p className="warning">{errors.mail.message}</p>}
          </div>

          <div className="relative">
            Password
            <input
              {...register("password")}
              type="password"
              placeholder="Create Password"
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
                I agree to the{" "}
                <span className="underline">Terms of Service</span> and{" "}
                <span className="underline">Privacy Policy</span>.
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="warning">{errors.acceptTerms.message}</p>
            )}
          </div>

          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all">
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-black font-bold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
