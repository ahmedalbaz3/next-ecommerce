"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useAppSelector } from "@/store/actions";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useAppSelector((state) => state.authReducer);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="p-2 size-9" />;

  return (
    <>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? (
          <Sun size={20} className="text-yellow-400" />
        ) : (
          <Moon size={20} className="text-zinc-600" />
        )}
      </button>
      {user && (
        <span className="ml-2 text-sm text-black dark:text-white">
          {user.name}
        </span>
      )}
    </>
  );
};
