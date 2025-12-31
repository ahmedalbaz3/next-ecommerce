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
  inStock,
}: {
  id: string;
  price: number;
  style?: string;
  dir: "rtl" | "ltr";
  inStock: boolean;
}) => {
  const dispatch = useAppDispatch();
  const tCardButton = useTranslations("productCard");

  const handelAddToCart = ({
    id,
    price,
    inStock,
  }: {
    id: string;
    price: number;
    inStock: boolean;
  }) => {
    if (!inStock) return;
    dispatch(addToCart({ id, price }));
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        handelAddToCart({ id, price, inStock });
      }}
      className={`cursor-pointer text-base md:text-lg font-medium px-4 py-2  border transition-all duration-300 whitespace-nowrap
        bg-violet-900  text-white hover:bg-amber-500 hover:text-white 
        dark:bg-zinc-900 dark:border-zinc-700 dark:text-white text-center
        ${style}`}
      dir={dir}
    >
      {tCardButton("button")}
    </div>
  );
};

export default AddToCart;
