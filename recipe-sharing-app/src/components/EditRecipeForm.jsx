import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRecipeStore from "../stores/recipeStore";

function EditRecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, updateRecipe } = useRecipeStore();

  const recipe = recipes.find((r) => r.id === Number(id));

  const [formData, setFormData] = useState({
    title: recipe?.title || "",
    description: recipe?.description || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe(recipe.id, formData);
    navigate(`/recipes/${recipe.id}`);
  };

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Recipe (ID: {recipe.id})</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Recipe Title"
          style={{ display: "block", margin: "10px 0" }}
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Recipe Description"
          style={{ display: "block", margin: "10px 0" }}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditRecipeForm;
