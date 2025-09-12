import create from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  // initialize list of recipes and keep filteredRecipes synced
  setRecipes: (recipes) =>
    set(() => {
      return { recipes, filteredRecipes: recipes };
    }),

  // addRecipe: add and re-run filtering based on current searchTerm
  addRecipe: (newRecipe) =>
    set((state) => {
      const recipes = [...state.recipes, newRecipe];
      const term = state.searchTerm || '';
      const filtered = filterByTerm(recipes, term);
      return { recipes, filteredRecipes: filtered };
    }),

  // updateRecipe: update and re-run filtering
  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const recipes = state.recipes.map((r) =>
        r.id === updatedRecipe.id ? { ...r, ...updatedRecipe } : r
      );
      const filtered = filterByTerm(recipes, state.searchTerm || '');
      return { recipes, filteredRecipes: filtered };
    }),

  // deleteRecipe: remove by id and re-run filtering
  deleteRecipe: (id) =>
    set((state) => {
      const recipes = state.recipes.filter((r) => r.id !== id);
      const filtered = filterByTerm(recipes, state.searchTerm || '');
      return { recipes, filteredRecipes: filtered };
    }),

  // setSearchTerm: set the term and immediately compute filteredRecipes
  setSearchTerm: (term) =>
    set((state) => {
      const filtered = filterByTerm(state.recipes, term);
      return { searchTerm: term, filteredRecipes: filtered };
    }),

  // filterRecipes: explicit action to recompute filteredRecipes (if you want to call it)
  filterRecipes: () =>
    set((state) => {
      const filtered = filterByTerm(state.recipes, state.searchTerm || '');
      return { filteredRecipes: filtered };
    }),
}));

// helper outside of store (keeps code readable)
function filterByTerm(recipes, term) {
  if (!term || term.trim() === '') return recipes;
  const q = term.toLowerCase();
  return recipes.filter((r) => {
    const titleMatch = (r.title || '').toLowerCase().includes(q);
    const descMatch = (r.description || '').toLowerCase().includes(q);
    // if you have ingredients or prepTime fields, add them here:
    // const ingredientsMatch = (r.ingredients || []).join(' ').toLowerCase().includes(q);
    return titleMatch || descMatch;
  });
}
