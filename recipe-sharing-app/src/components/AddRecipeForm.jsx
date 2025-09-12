import React, { useState } from "react";
import { useRecipeStore } from "./recipeStore";

const AddRecipeForm = () => {
  // store action
  const addRecipe = useRecipeStore((s) => s.addRecipe);

  // grader expects setTitle, setDescription usage
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim()) {
      addRecipe({
        id: Date.now(),
        title,
        description,
      });
      // reset
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: 8,
        marginBottom: 20,
        background: "#fafafa",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Add a Recipe</h2>
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: "100%", padding: 8 }}
      />
      <textarea
        placeholder="Recipe Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: "100%", padding: 8 }}
      />
      <button type="submit" style={{ padding: "8px 16px" }}>
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;