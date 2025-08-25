import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMealPlan } from "../redux/store/mealPlansSlice";
import { fetchRecipes } from "../api";

function MealPlanForm() {
  const [giorno, setGiorno] = useState("LUNEDI");
  const [pasto, setPasto] = useState("COLAZIONE");
  const [recipeId, setRecipeId] = useState("");
  const [recipes, setRecipes] = useState([]);
  const dispatch = useDispatch();

  // 🔹 Carico le ricette dal backend
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const res = await fetchRecipes();
        setRecipes(res.data);
      } catch (err) {
        console.error("Errore caricamento ricette:", err);
      }
    };
    loadRecipes();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recipeId) return;

    dispatch(addMealPlan({ giorno, pasto, recipe: { id: recipeId } }));
    setRecipeId("");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-2 mb-3">
      <select value={giorno} onChange={(e) => setGiorno(e.target.value)}>
        <option>LUNEDI</option>
        <option>MARTEDI</option>
        <option>MERCOLEDI</option>
        <option>GIOVEDI</option>
        <option>VENERDI</option>
        <option>SABATO</option>
        <option>DOMENICA</option>
      </select>

      <select value={pasto} onChange={(e) => setPasto(e.target.value)}>
        <option>COLAZIONE</option>
        <option>PRANZO</option>
        <option>CENA</option>
      </select>

      {/* 🔹 Dropdown ricette dal Redux store */}
      <select value={recipeId} onChange={(e) => setRecipeId(e.target.value)}>
        <option value="">-- Seleziona una ricetta --</option>
        {recipes.map((r) => (
          <option key={r.id} value={r.id}>
            {r.titolo}
          </option>
        ))}
      </select>

      <button type="submit" className="btn btn-success">
        Aggiungi
      </button>
    </form>
  );
}

export default MealPlanForm;
