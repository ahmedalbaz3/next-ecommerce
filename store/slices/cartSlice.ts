import { fetchProducts } from "@/api/api";
import { TProduct } from "@/types/TProduct";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartState {
  items: { [key: string]: number };
  fullProductInfo: TProduct[];
  totalPrice: number;
  loading: "idle" | "pending" | "fulfilled" | "failed";
  error: string | null;
}

// Load from localStorage
const saved = JSON.parse(
  localStorage.getItem("cart") || "{}"
) as Partial<ICartState>;

const initialState: ICartState = {
  items: saved.items || {},
  fullProductInfo: saved.fullProductInfo || [],
  totalPrice: saved.totalPrice || 0,
  loading: "idle",
  error: null,
};

const save = (state: ICartState) => {
  localStorage.setItem(
    "cart",
    JSON.stringify({
      items: state.items,
      totalPrice: state.totalPrice,
    })
  );
};

export const loadCartProducts = createAsyncThunk(
  "cart/loadCartProducts",
  async (items: Record<string, number>) => {
    const products: TProduct[] = await fetchProducts();
    // Filter products based on cart items
    return products.filter((p) => items[p.id]);
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, price } = action.payload;
      console.log(id, price);

      if (state.items[id]) {
        state.items[id]++;
        state.totalPrice += price;
        state.error = null;
      } else {
        state.items[id] = 1;
        state.totalPrice += price;
        state.error = null;
      }

      save(state);
    },

    changeQuantity: (state, action) => {
      const { id, price, type } = action.payload;
      const oldQuantity = state.items[id] || 0;

      if (type === "inc") {
        const newQuantity = oldQuantity + 1;

        state.items[id] = newQuantity;
        state.totalPrice += price;
      } else if (type === "dec" && oldQuantity > 1) {
        const newQuantity = oldQuantity - 1;

        state.items[id] = newQuantity;
        state.totalPrice -= price;
      } else if (type === "dec" && oldQuantity === 1) {
        return;
      }

      save(state);
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const price = state.fullProductInfo.find((el) => el.id === id)?.price;
      const quantity = state.items[id];

      state.totalPrice = state.totalPrice - (price || 0) * quantity;
      delete state.items[id];
      const products = state.fullProductInfo.filter((el) => el.id !== id);
      state.fullProductInfo = products;

      save(state);
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
