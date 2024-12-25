import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryType: {},
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryType: (state, action) => {
      state.categoryType = action.payload;
    },
  },
});

export const { setCategoryType } = categorySlice.actions;
export default categorySlice.reducer;
