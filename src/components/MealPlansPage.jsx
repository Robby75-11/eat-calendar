import React, { useState } from "react";
import MealPlansList from "./MealPlanList";
import MealPlansForm from "./MealPlanForm";

const MealPlansPage = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <MealPlansForm onMealPlanAdded={() => setRefresh(!refresh)} />
      <MealPlansList key={refresh} />
    </div>
  );
};

export default MealPlansPage;
