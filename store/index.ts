import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import dirReducer from "./slices/directionSlice";
import authReducer from "./slices/authSlice";
import { cartListener } from "./slices/cartMiddelware";

const store = configureStore({
  reducer: {
    cartReducer,
    dirReducer,
    authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(cartListener.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
