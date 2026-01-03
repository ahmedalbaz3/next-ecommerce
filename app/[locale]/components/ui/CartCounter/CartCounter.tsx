"use client";
import { useAppSelector } from "@/store/actions";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const CartCounter = () => {
  const items = useAppSelector((state) => state.cartReducer.items);
  const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated);
  const cartQuantity = Object.values(items).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  });

  return (
    <Link href="/cart " className="header-actions relative">
      <ShoppingBag />
      {isAuth && mounted && cartQuantity > 0 && (
        <span className="absolute top-1 right-1 size-4 bg-black dark:bg-white text-white dark:text-black text-[10px] flex items-center justify-center rounded-full font-bold">
          {cartQuantity}
        </span>
      )}
    </Link>
  );
};

export default CartCounter;
