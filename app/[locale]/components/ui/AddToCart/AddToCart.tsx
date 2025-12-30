"use client";
import React from "react";
import { useAppDispatch } from "@/store/actions";
import { addToCart } from "@/store/slices/cartSlice";
import { useTranslations } from "next-intl";

const AddToCart = ({
  id,
  price,
  style,
  dir,
}: {
  id: string;
  price: number;
  style?: string;
  dir: "rtl" | "ltr";
}) => {
  const dispatch = useAppDispatch();
  const tCardButton = useTranslations("productCard");

  const handelAddToCart = ({ id, price }: { id: string; price: number }) => {
    dispatch(addToCart({ id, price }));
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        handelAddToCart({ id, price });
      }}
      className={`cursor-pointer text-base md:text-lg font-medium px-4 py-2 rounded-full border transition-all duration-300 whitespace-nowrap
        bg-white border-zinc-400 text-black hover:bg-sky-500 hover:text-white hover:border-sky-500
        dark:bg-zinc-900 dark:border-zinc-700 dark:text-white dark:hover:bg-sky-600 dark:hover:border-sky-600
        ${style}`}
      dir={dir}
    >
      {tCardButton("button")}
    </div>
  );
};

export default AddToCart;
