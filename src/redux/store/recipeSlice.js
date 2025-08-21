import { createSlice } from "@reduxjs/toolkit";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: { items: [] },
  reducers: {
    setRecipes: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;
