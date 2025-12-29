"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/actions";
import { setCredentials } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

const logInSchema = z.object({
  mail: z
    .email("Invalid email format")
    .regex(EMAIL_REGEX, "Email does not meet security requirements"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
});

type logInT = z.infer<typeof logInSchema>;

export default function LoginPage() {
  const router = useRouter();
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );

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
  } = useForm<logInT>({
    resolver: zodResolver(logInSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data: logInT) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.mail, password: data.password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const result = await response.json(); // { user, token }

      dispatch(setCredentials(result));
      console.log("Updated auth state:", result);

      reset();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-gray-500 mt-2">
            Enter your details to access your account
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            Mail
            <input
              {...register("mail")}
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
            />
            {errors.mail && <p>{errors.mail.message}</p>}
          </div>

          <div className="relative">
            Password
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all transform active:scale-[0.98]">
            Sign In --
          </button>
        </form>

        <p className="text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-black font-bold hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
