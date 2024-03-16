import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  navigationTitle: string;
  subNavigationTitle: string;
} = { navigationTitle: "", subNavigationTitle: "" };

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setNavigationTitle: (state, action) => {
      state.navigationTitle = action.payload;
    },
    setSubNavigationTitle: (state, action) => {
      state.subNavigationTitle = action.payload;
    },
  },
});

export const { setNavigationTitle, setSubNavigationTitle } =
  navigationSlice.actions;
export default navigationSlice.reducer;
