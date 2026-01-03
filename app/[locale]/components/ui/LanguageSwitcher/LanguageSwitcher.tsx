"use client";
import { useAppDispatch, useAppSelector } from "@/store/actions";
import { toggleDirection } from "@/store/slices/directionSlice";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import React from "react";

const LanguageSwitcher = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);

  const togglePageDirection = () => {
    const newLocale = isRtl ? "en" : "ar";
    dispatch(toggleDirection());
    const pathSegments = pathname.split("/");
    pathSegments[1] = newLocale;
    router.push(pathSegments.join("/"));
  };

  return (
    <button
      onClick={togglePageDirection}
      className="header-actions text-black dark:text-white"
      aria-label="Change Language"
    >
      <Globe size={22} strokeWidth={1.5} />
    </button>
  );
};

export default LanguageSwitcher;
