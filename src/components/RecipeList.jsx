import React, { useEffect, useState } from "react";
import { fetchRecipes, deleteRecipe } from "../api";
import { Card, Button, Spinner } from "react-bootstrap";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetchRecipes();
        setRecipes(response.data);
      } catch (error) {
        console.error("Errore nel caricamento ricette:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Errore nell'eliminazione ricetta:", error);
    }
  };

  if (loading) return <Spinner animation="border" className="mt-3" />;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🍽️ Ricette</h2>
      {recipes.length === 0 ? (
        <p className="text-muted text-center">Nessuna ricetta trovata.</p>
      ) : (
        <div className="row">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4 mb-4">
              <Card className="shadow-sm h-100 border-0 rounded-3">
                <Card.Img
                  variant="top"
                  src={
                    recipe.immagineUrl
                      ? recipe.immagineUrl
                      : "https://via.placeholder.com/400x250.png?text=Nessuna+Immagine"
                  }
                  alt={recipe.titolo}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <Card.Body>
                  <Card.Title>{recipe.titolo}</Card.Title>
                  <Card.Text className="text-muted">
                    {recipe.descrizione}
                  </Card.Text>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    ❌ Elimina
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
