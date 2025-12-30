import { TProduct } from "@/types/TProduct";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// ----- Types -----
interface ICartState {
  items: Record<string, number>;
  fullProductInfo: TProduct[];
  totalPrice: number;
  loading: "idle" | "pending" | "fulfilled" | "failed";
  error: string | null;
}

// ----- Helpers -----
const saveCart = (state: ICartState) => {
  localStorage.setItem(
    "cart",
    JSON.stringify({
      items: state.items,
      totalPrice: state.totalPrice,
    })
  );
};

const loadCartFromStorage = (): Partial<ICartState> => {
  if (typeof window === "undefined") return {};
  return JSON.parse(localStorage.getItem("cart") || "{}");
};

// ----- Initial State -----
const saved = loadCartFromStorage();

const initialState: ICartState = {
  items: saved.items || {},
  fullProductInfo: saved.fullProductInfo || [],
  totalPrice: saved.totalPrice || 0,
  loading: "idle",
  error: null,
};

// ----- Async Thunk -----
export const loadCartProducts = createAsyncThunk(
  "cart/loadCartProducts",
  async (items: Record<string, number>) => {
    if (Object.keys(items).length === 0) return [];

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    const allProducts: TProduct[] = data.products || data;
    return allProducts.filter((p) => items[p.id]);
  }
);

// ----- Slice -----
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ id: string; price: number }>
    ) => {
      const { id, price } = action.payload;
      state.items[id] = (state.items[id] || 0) + 1;
      state.totalPrice += price;
      saveCart(state);
    },

    changeQuantity: (
      state,
      action: PayloadAction<{ id: string; price: number; type: "inc" | "dec" }>
    ) => {
      const { id, price, type } = action.payload;
      const qty = state.items[id] || 0;

      if (type === "inc") {
        state.items[id] = qty + 1;
        state.totalPrice += price;
      } else if (type === "dec" && qty > 1) {
        state.items[id] = qty - 1;
        state.totalPrice -= price;
      }
      saveCart(state);
    },

    deleteItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const price = state.fullProductInfo.find((p) => p.id === id)?.price || 0;
      const qty = state.items[id] || 0;

      state.totalPrice -= price * qty;
      delete state.items[id];
      state.fullProductInfo = state.fullProductInfo.filter((p) => p.id !== id);

      saveCart(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCartProducts.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        loadCartProducts.fulfilled,
        (state, action: PayloadAction<TProduct[]>) => {
          state.loading = "fulfilled";
          state.fullProductInfo = action.payload;
        }
      )
      .addCase(loadCartProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to load products";
      });
  },
});

export const { addToCart, changeQuantity, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
