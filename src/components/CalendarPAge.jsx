import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMealPlansAsync,
  addMealPlan,
  removeMealPlan,
} from "../redux/store/mealPlansSlice";
import MealPlanForm from "./MealPlanForm";

export default function CalendarPage() {
  const dispatch = useDispatch();
  const mealPlans = useSelector((state) => state.mealPlans.items);
  const loading = useSelector((state) => state.mealPlans.loading);
  const error = useSelector((state) => state.mealPlans.error);

  useEffect(() => {
    dispatch(fetchMealPlansAsync());
  }, [dispatch]);

  const days = [
    "LUNEDI",
    "MARTEDI",
    "MERCOLEDI",
    "GIOVEDI",
    "VENERDI",
    "SABATO",
    "DOMENICA",
  ];

  const meals = ["COLAZIONE", "PRANZO", "CENA"];

  const handleAddMealPlan = (giorno, pasto, recipeId) => {
    dispatch(addMealPlan({ giorno, pasto, recipe: { id: recipeId } }));
  };

  const handleDeleteMealPlan = (id) => {
    dispatch(removeMealPlan(id));
  };

  if (loading) return <p>⏳ Caricamento in corso...</p>;
  if (error) return <p className="text-danger">❌ {error}</p>;

  return (
    <div>
      {/* Form per aggiungere un pasto */}
      <MealPlanForm onAdd={handleAddMealPlan} />

      {/* Calendario */}
      <div className="calendar d-flex gap-3 mt-4">
        {days.map((day) => (
          <div key={day} className="day-column border p-2 rounded">
            <h3 className="text-center">{day}</h3>
            {meals.map((meal) => {
              const plan = mealPlans.find(
                (p) => p.giorno === day && p.pasto === meal
              );
              return (
                <div
                  key={meal}
                  className="meal-slot border-top py-2 d-flex flex-column"
                >
                  <strong>{meal}</strong>
                  <span>
                    {plan?.recipe?.titolo || plan?.recipe?.nome || "—"}
                  </span>
                  {plan && (
                    <button
                      className="btn btn-sm btn-danger mt-1"
                      onClick={() => handleDeleteMealPlan(plan.id)}
                    >
                      ❌ Rimuovi
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
