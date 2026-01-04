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
      className={` text-sm py-1.5 px-2.5 bg-amber-500 rounded-2xl w-fit mt-3  duration-300 text-white shadow-md ${
        inStock
          ? "hover:bg-amber-600 cursor-pointer "
          : "opacity-50 cursor-not-allowed"
      }
        ${style}`}
      dir={dir}
    >
      {tCardButton("button")}
    </div>
  );
};

export default AddToCart;
