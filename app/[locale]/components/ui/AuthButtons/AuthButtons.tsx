"use client";

import { useAppDispatch, useAppSelector } from "@/store/actions";
import { logout } from "@/store/slices/authSlice";
import { useTranslations } from "next-intl";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";

const AuthButtons = () => {
  const t = useTranslations("header");
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-2 size-9" />;
  }

  return (
    <>
      {isAuth ? (
        <>
          <Link
            href="/auth/login"
            className="header-links text-red-600"
            onClick={() => dispatch(logout())}
          >
            {t("logout")}
          </Link>
        </>
      ) : (
        <>
          <Link href="/auth/login" className="header-links">
            {t("login")}
          </Link>
          |
          <Link href="/auth/signup" className="header-links">
            {t("signup")}
          </Link>
        </>
      )}
    </>
  );
};

export default AuthButtons;
