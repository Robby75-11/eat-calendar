import { configureStore } from "@reduxjs/toolkit";
import mealPlansReducer from "./mealPlansSlice";
import recipeReducer from "./recipeSlice";
import authReducer from "./authSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer,
    mealPlans: mealPlansReducer,
  },
});

export default store;
