"use client";

import { useAppSelector } from "@/store/actions";
import { User } from "lucide-react";
import Link from "next/link";

const UserNavigator = () => {
  const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated);

  return (
    <>
      {isAuth && (
        <Link href="account" className="header-actions">
          <User />
        </Link>
      )}
    </>
  );
};

export default UserNavigator;
