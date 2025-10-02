import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LOCAL_KEY = "recipes_custom";

export default function AddRecipeForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredientsText, setIngredientsText] = useState(""); // multiline
  const [stepsText, setStepsText] = useState(""); // multiline
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Please enter a title.";
    // parse ingredients by newline or comma
    const ingredients = ingredientsText
      .split(/\r?\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (ingredients.length < 2)
      errs.ingredients = "Please provide at least two ingredients (comma or newline separated).";

    const steps = stepsText
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (steps.length < 1) errs.steps = "Please provide preparation steps (at least 1).";

    return { errs, ingredients, steps };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg("");
    const { errs, ingredients, steps } = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      const newRecipe = {
        id: Date.now(),
        title: title.trim(),
        summary:
          steps.join(" ").slice(0, 140) ||
          (ingredients.slice(0, 2).join(", ") + "..."),
        image: imageUrl.trim() || `https://via.placeholder.com/900x600?text=${encodeURIComponent(title.trim())}`,
        ingredients,
        steps
      };

      // read existing custom recipes from localStorage
      const existingRaw = localStorage.getItem(LOCAL_KEY);
      let existing = [];
      try {
        existing = existingRaw ? JSON.parse(existingRaw) : [];
        if (!Array.isArray(existing)) existing = [];
      } catch {
        existing = [];
      }

      // add new recipe to beginning
      const next = [newRecipe, ...existing];
      localStorage.setItem(LOCAL_KEY, JSON.stringify(next));

      setSuccessMsg("Recipe added successfully!");
      // small delay to show success then navigate home
      setTimeout(() => {
        navigate("/");
      }, 700);
    } catch (err) {
      setErrors({ submit: "Could not save recipe. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Add a New Recipe</h2>

          <form onSubmit={handleSubmit} noValidate>
            <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-md p-2 mb-2 focus:ring-2 focus:ring-blue-200"
              placeholder="e.g., Lemon Garlic Salmon"
              aria-invalid={errors.title ? "true" : "false"}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && <p id="title-error" className="text-sm text-red-600 mb-2">{errors.title}</p>}

            <label className="block mb-2 text-sm font-medium text-gray-700">Image URL (optional)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border border-gray-200 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-200"
              placeholder="https://..."
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Ingredients (one per line or comma separated)</label>
            <textarea
              rows="4"
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              className="w-full border border-gray-200 rounded-md p-2 mb-2 focus:ring-2 focus:ring-blue-200"
              placeholder={"e.g.\n200g spaghetti\n100g pancetta\n2 eggs"}
              aria-invalid={errors.ingredients ? "true" : "false"}
              aria-describedby={errors.ingredients ? "ingredients-error" : undefined}
            />
            {errors.ingredients && <p id="ingredients-error" className="text-sm text-red-600 mb-2">{errors.ingredients}</p>}

            <label className="block mb-2 text-sm font-medium text-gray-700">Preparation Steps (one per line)</label>
            <textarea
              rows="6"
              value={stepsText}
              onChange={(e) => setStepsText(e.target.value)}
              className="w-full border border-gray-200 rounded-md p-2 mb-2 focus:ring-2 focus:ring-blue-200"
              placeholder={"Step 1\nStep 2\nStep 3"}
              aria-invalid={errors.steps ? "true" : "false"}
              aria-describedby={errors.steps ? "steps-error" : undefined}
            />
            {errors.steps && <p id="steps-error" className="text-sm text-red-600 mb-2">{errors.steps}</p>}

            {errors.submit && <p className="text-sm text-red-600 mb-2">{errors.submit}</p>}
            {successMsg && <p className="text-sm text-green-600 mb-2">{successMsg}</p>}

            <div className="flex items-center gap-3 mt-4">
              <button
                type="submit"
                disabled={submitting}
                className={`px-4 py-2 rounded-md text-white ${submitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                {submitting ? "Saving..." : "Add Recipe"}
              </button>

              <button
                type="button"
                onClick={() => { setTitle(""); setImageUrl(""); setIngredientsText(""); setStepsText(""); setErrors({}); setSuccessMsg(""); }}
                className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
