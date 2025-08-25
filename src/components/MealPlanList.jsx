import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMealPlansAsync,
  removeMealPlan,
} from "../redux/store/mealPlansSlice";

function MealPlansList() {
  const dispatch = useDispatch();
  const mealPlans = useSelector((state) => state.mealPlans.items);
  const status = useSelector((state) => state.mealPlans.status);

  // 🔄 Carico i meal plans all'avvio
  useEffect(() => {
    dispatch(fetchMealPlansAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeMealPlan(id));
  };

  return (
    <div className="container mt-4">
      <h2>📅 Meal Plans</h2>

      {status === "loading" && <p>Caricamento in corso...</p>}
      {status === "failed" && (
        <p className="text-danger">Errore durante il caricamento.</p>
      )}
      {status === "succeeded" && mealPlans.length === 0 && (
        <p className="text-muted">Nessun piano pasto ancora aggiunto.</p>
      )}

      <ul className="list-group">
        {mealPlans.map((plan) => (
          <li
            key={plan.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>
                {plan.giorno} – {plan.pasto}
              </strong>
              <br />
              Ricetta:{" "}
              {plan.recipe?.titolo
                ? plan.recipe.titolo
                : `ID ${plan.recipe?.id || "?"}`}
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(plan.id)}
            >
              ❌ Elimina
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MealPlansList;
