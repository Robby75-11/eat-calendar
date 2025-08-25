import { useState } from "react";
import { createRecipe, uploadRecipeImages } from "../api"; // 🔹 aggiungi upload API

const RecipeForm = ({ onRecipeAdded }) => {
  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [ingredienti, setIngredienti] = useState("");
  const [files, setFiles] = useState([]); // 🔹 immagini selezionate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuovaRicetta = {
      titolo,
      descrizione,
      ingredienti: ingredienti.split(",").map((i) => i.trim()),
    };

    try {
      // 1️⃣ creo ricetta senza immagini
      const response = await createRecipe(nuovaRicetta);
      const createdRecipe = response.data;

      // 2️⃣ se ho immagini le carico con PATCH
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        await uploadRecipeImages(createdRecipe.id, formData);
      }

      if (onRecipeAdded) onRecipeAdded(createdRecipe);

      // reset form
      setTitolo("");
      setDescrizione("");
      setIngredienti("");
      setFiles([]);
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

        <div>
          <label className="form-label">Immagini</label>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files))}
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
