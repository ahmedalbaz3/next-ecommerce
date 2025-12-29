import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import dirReducer from "./slices/directionSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    cartReducer,
    dirReducer,
    authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
