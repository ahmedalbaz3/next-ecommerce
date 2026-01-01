import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addToCart } from "./cartSlice";
import { toast } from "sonner";

export const cartListener = createListenerMiddleware();

cartListener.startListening({
  actionCreator: addToCart,
  effect: async (action) => {
    toast.success("Item added to cart!");
  },
});
