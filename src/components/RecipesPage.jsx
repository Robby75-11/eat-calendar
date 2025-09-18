import { useState } from "react";
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";

const RecipesPage = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <RecipeForm onRecipeAdded={() => setRefresh(!refresh)} />
      <RecipeList key={refresh} />
    </div>
  );
};

export default RecipesPage;
