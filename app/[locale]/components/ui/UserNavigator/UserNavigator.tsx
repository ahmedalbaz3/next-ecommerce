"use client";

import { useAppSelector } from "@/store/actions";
import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserNavigator = () => {
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
      {isAuth && (
        <Link href="account" className="header-actions">
          <User />
        </Link>
      )}
    </>
  );
};

export default UserNavigator;
