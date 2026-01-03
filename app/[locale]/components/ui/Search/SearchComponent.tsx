"use client";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { TProduct } from "@/types/TProduct";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/actions";
import { useTranslations } from "next-intl";

const SearchComponent = () => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const router = useRouter();
  const isRtl = useAppSelector((state) => state.dirReducer.isRtl);

  const [results, setResults] = useState<TProduct[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(query);
      if (query.trim()) {
        fetchResults(query);
      } else {
        setResults([]);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const fetchResults = async (term: string) => {
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <form
      action="search"
      className="w-2/5 items-center  border border-gray-400 hidden md:flex relative"
      onSubmit={(e) => {
        e.preventDefault();
        if (!query.trim()) {
          console.log("write something");

          return;
        }
        router.push(`/search/${query.trim()}`);
      }}
    >
      <div className="icon px-3 py-2 ">
        <Search width={15} />
      </div>
      <input
        type="text"
        name="search"
        placeholder={t("search")}
        className="py-2 outline-0 w-11/12"
        role="search box"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <label htmlFor="search" className="hidden">
        Search
      </label>
      <button
        type="submit"
        className="py-2 px-3 bg-amber-400 hover:text-white  text-black font-medium cursor-pointer"
      >
        {t("search")}
      </button>
      {results.length > 0 && (
        <div className="w-full p-5 bg-black absolute top-full text-white flex flex-col gap-5 z-20">
          {results.slice(0, 10).map((result) => (
            <Link
              href={`/product/${result.id}`}
              key={result.id}
              className="reult flex gap-5 items-center"
            >
              <Image
                src={result.image}
                width={50}
                height={50}
                alt={result.name_en}
              />
              <p>
                <span className="text-yellow-400 text-xl font-semibold">
                  {isRtl ? result.name_ar : result.name_en}:{" "}
                </span>
                {isRtl ? result.description_ar : result.description_en}
              </p>
            </Link>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchComponent;
