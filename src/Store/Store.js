import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../Slice/Slice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});

export default store;
