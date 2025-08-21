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

  // 🔹 Funzione per determinare immagine in base al titolo
  const getImageUrl = (titolo, id) => {
    const lower = titolo.toLowerCase();

    // Ricette specifiche
    if (lower.includes("panzerotto"))
      return `https://source.unsplash.com/400x250/?panzerotto,forno,italian&sig=${id}`;
    if (lower.includes("pizza") && lower.includes("viennese"))
      return `https://source.unsplash.com/400x250/?pizza,sausage,italian&sig=${id}`;
    if (lower.includes("pizza") && lower.includes("margherita"))
      return `https://source.unsplash.com/400x250/?pizza,margherita,italian&sig=${id}`;
    if (lower.includes("pasta e lenticchie"))
      return `https://source.unsplash.com/400x250/?pasta,lentils,italian&sig=${id}`;
    if (lower.includes("piadina"))
      return `https://source.unsplash.com/400x250/?piadina,flatbread,italian&sig=${id}`;
    if (lower.includes("fritta"))
      return `https://source.unsplash.com/400x250/?fried,italian,streetfood&sig=${id}`;
    if (lower.includes("pasta crudaiola"))
      return `https://source.unsplash.com/400x250/?pasta,tomato,basil,italian&sig=${id}`;
    if (lower.includes("pasta alla ricotta"))
      return `https://source.unsplash.com/400x250/?pasta,ricotta,italian&sig=${id}`;
    if (lower.includes("polpo alla griglia"))
      return `https://source.unsplash.com/400x250/?grilled,octopus,seafood,italian&sig=${id}`;
    if (lower.includes("mozzarella") && lower.includes("pomodori"))
      return `https://source.unsplash.com/400x250/?caprese,mozzarella,tomato,italian&sig=${id}`;
    if (lower.includes("pasta al sugo"))
      return `https://source.unsplash.com/400x250/?pasta,tomato sauce,italian&sig=${id}`;

    // Categorie generiche
    if (
      lower.includes("pasta") ||
      lower.includes("spaghetti") ||
      lower.includes("lasagna") ||
      lower.includes("gnocchi") ||
      lower.includes("risotto")
    ) {
      return `https://source.unsplash.com/400x250/?pasta,italian,food&sig=${id}`;
    } else if (
      lower.includes("pollo") ||
      lower.includes("carne") ||
      lower.includes("bistecca") ||
      lower.includes("manzo") ||
      lower.includes("pesce")
    ) {
      return `https://source.unsplash.com/400x250/?meat,dish,italian food&sig=${id}`;
    }

    // Default
    return `https://source.unsplash.com/400x250/?italian,food&sig=${id}`;
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
                  src={getImageUrl(recipe.titolo, recipe.id)}
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
