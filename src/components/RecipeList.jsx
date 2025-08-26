import React, { useEffect, useState } from "react";
import { fetchRecipes, updateRecipe, deleteRecipe } from "../api";
import { Card, Button, Spinner } from "react-bootstrap";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [formData, setFormData] = useState({
    titolo: "",
    descrizione: "",
    ingredienti: "",
  });

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

  const handleEditClick = (recipe) => {
    setEditingRecipe(recipe);
    setFormData({
      titolo: recipe.titolo,
      descrizione: recipe.descrizione,
      ingredienti: recipe.ingredienti || "",
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateRecipe(editingRecipe.id, formData);
      setRecipes((prev) =>
        prev.map((r) => (r.id === editingRecipe.id ? response.data : r))
      );
      setEditingRecipe(null);
    } catch (error) {
      console.error("Errore nella modifica ricetta:", error);
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
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditClick(recipe)}
                  >
                    ✏️ Modifica
                  </Button>
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

      {/* Modale Modifica */}
      {editingRecipe && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifica Ricetta</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingRecipe(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Titolo"
                  value={formData.titolo}
                  onChange={(e) =>
                    setFormData({ ...formData, titolo: e.target.value })
                  }
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="Descrizione"
                  rows="3"
                  value={formData.descrizione}
                  onChange={(e) =>
                    setFormData({ ...formData, descrizione: e.target.value })
                  }
                ></textarea>
                <textarea
                  className="form-control"
                  placeholder="Ingredienti"
                  rows="3"
                  value={formData.ingredienti}
                  onChange={(e) =>
                    setFormData({ ...formData, ingredienti: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="modal-footer">
                <Button
                  variant="secondary"
                  onClick={() => setEditingRecipe(null)}
                >
                  Annulla
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                  Salva
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default RecipeList;
