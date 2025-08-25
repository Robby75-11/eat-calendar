import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 🔧 cambia se deployi in prod
});

// Interceptor per aggiungere automaticamente il token a ogni richiesta
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// === ENDPOINTS ===

// 🔐 AUTH
export const login = (credentials) => api.post("/auth/login", credentials);
export const register = (data) => api.post("/auth/register", data);

// 🍽️ RECIPES
export const fetchRecipes = () => api.get("/recipes");
export const fetchRecipeById = (id) => api.get(`/recipes/${id}`);
export const createRecipe = (recipe) => api.post("/recipes", recipe);
export const deleteRecipe = (id) => api.delete(`/recipes/${id}`);

// 📅 MEAL PLANS
export const fetchMealPlans = () => {
  const userId = localStorage.getItem("userId");
  return api.get(`/mealplans/${userId}/weekly`);
};

export const fetchMealPlanById = (id) => api.get(`/mealplans/${id}`);

export const createMealPlan = (mealPlan) => {
  const userId = localStorage.getItem("userId");
  return api.post(`/mealplans?userId=${userId}`, mealPlan);
};

export const deleteMealPlan = (id) => api.delete(`/mealplans/${id}`);
export default api;
