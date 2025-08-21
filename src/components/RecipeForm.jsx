import { useState } from "react";
import { createRecipe } from "../api";

const RecipeForm = ({ onRecipeAdded }) => {
  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [ingredienti, setIngredienti] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuovaRicetta = {
      titolo,
      descrizione,
      ingredienti: ingredienti.split(",").map((i) => i.trim()), // trasformo stringa in array
    };

    try {
      const response = await createRecipe(nuovaRicetta);
      console.log("Ricetta creata:", response.data);

      // notifico al parent che c’è una nuova ricetta
      if (onRecipeAdded) onRecipeAdded(response.data);

      // reset campi
      setTitolo("");
      setDescrizione("");
      setIngredienti("");
    } catch (error) {
      console.error("Errore nella creazione ricetta:", error);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h3 className="mb-3 text-primary">➕ Aggiungi Ricetta</h3>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div>
          <label className="form-label">Titolo</label>
          <input
            type="text"
            className="form-control"
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="form-label">Descrizione</label>
          <textarea
            className="form-control"
            rows="3"
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="form-label">
            Ingredienti (separati da virgola)
          </label>
          <input
            type="text"
            className="form-control"
            value={ingredienti}
            onChange={(e) => setIngredienti(e.target.value)}
            placeholder="Es. Pasta, Uova, Guanciale"
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          💾 Salva Ricetta
        </button>
      </form>
    </div>
  );
};
export default RecipeForm;
