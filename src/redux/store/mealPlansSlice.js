import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMealPlans, createMealPlan, deleteMealPlan } from "../../api";

// 🔹 Thunks asincroni per chiamate API
export const fetchMealPlansAsync = createAsyncThunk(
  "mealPlans/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchMealPlans();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Errore nel caricamento");
    }
  }
);

export const addMealPlan = createAsyncThunk(
  "mealPlans/add",
  async (mealPlan, { rejectWithValue }) => {
    try {
      const response = await createMealPlan(mealPlan);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Errore nella creazione");
    }
  }
);

export const removeMealPlan = createAsyncThunk(
  "mealPlans/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteMealPlan(id);
      return id; // ritorniamo solo l’id eliminato
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Errore nella cancellazione"
      );
    }
  }
);

// 🔹 Slice Redux
const mealPlansSlice = createSlice({
  name: "mealPlans",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchMealPlansAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMealPlansAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMealPlansAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addMealPlan.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addMealPlan.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete
      .addCase(removeMealPlan.fulfilled, (state, action) => {
        state.items = state.items.filter((plan) => plan.id !== action.payload);
      })
      .addCase(removeMealPlan.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default mealPlansSlice.reducer;
