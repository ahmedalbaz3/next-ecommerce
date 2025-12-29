"use client";
import React from "react";
import { useAppDispatch } from "@/store/actions";
import { addToCart } from "@/store/slices/cartSlice";
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

  const handelAddToCart = ({ id, price }: { id: string; price: number }) => {
    dispatch(addToCart({ id, price }));
  };
  return (
    <div
      onClick={() => handelAddToCart({ id, price })}
      className={`cursor-pointer text-xl hover:bg-sky-500 text-center hover:text-white duration-200 hover:border-white p-2 rounded-3xl border border-gray-500 whitespace-nowrap ${style}`}
    >
      {dir === "ltr" ? "add to cart" : "اضف للعربه"}
    </div>
  );
};

export default AddToCart;
