import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMealPlan } from "../redux/store/mealPlansSlice";

function MealPlanForm() {
  const [giorno, setGiorno] = useState("LUNEDI");
  const [pasto, setPasto] = useState("COLAZIONE");
  const [recipeId, setRecipeId] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
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

      <input
        type="text"
        placeholder="ID ricetta"
        value={recipeId}
        onChange={(e) => setRecipeId(e.target.value)}
      />

      <button type="submit" className="btn btn-success">
        Aggiungi
      </button>
    </form>
  );
}

export default MealPlanForm;
