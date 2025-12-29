import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DirState {
  isRtl: boolean;
  direction: "ltr" | "rtl";
}

const initialState: DirState = {
  isRtl: false,
  direction: "ltr",
};

const setToCookie = (newDir: "ltr" | "rtl") => {
  if (typeof document !== "undefined") {
    const newLocale = newDir === "rtl" ? "ar" : "en";

    document.cookie =
      "direction=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie =
      "NEXT_LOCALE=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    document.cookie = `direction=${newDir}; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    document.documentElement.dir = newDir;
  }
};

// Helper to read cookie
const getFromCookie = (): "ltr" | "rtl" => {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/direction=(ltr|rtl)/);
    return (match ? match[1] : "ltr") as "ltr" | "rtl";
  }
  return "ltr";
};

// Load direction from cookie
export const loadDirectionFromCookie = () => (dispatch: any) => {
  const dir = getFromCookie();
  dispatch(setDirection(dir));
};

const dirSlice = createSlice({
  name: "direction",
  initialState,
  reducers: {
    toggleDirection: (state) => {
      state.isRtl = !state.isRtl;
      state.direction = state.isRtl ? "rtl" : "ltr";
      setToCookie(state.direction);
    },

    setDirection: (state, action: PayloadAction<"ltr" | "rtl">) => {
      state.direction = action.payload;
      state.isRtl = action.payload === "rtl";
      setToCookie(action.payload);
    },
  },
});

export const { toggleDirection, setDirection } = dirSlice.actions;
export default dirSlice.reducer;
