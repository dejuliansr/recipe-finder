import { useState } from 'react';
import './App.css';

import type { Meal } from './types/meal';
import SearchByName from './components/SearchByName';
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal';
import AlertModal from './components/AlertModal';

export default function App() {
  const [nameQuery, setNameQuery] = useState('');
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [selectedRecipe, setSelectedRecipe] =
    useState<Meal | null>(null);
  const [loadingRecipes, setLoadingRecipes] =
    useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  // Search by food name
  async function searchByName() {
    if (!nameQuery.trim()) {
      setAlertMessage('Please enter a food name!');
      return;
    }
    try {
      setLoadingRecipes(true);
      setLoadingButton(true);
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          nameQuery
        )}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (err) {
      console.error(err);
      setRecipes([]);
    } finally {
      setLoadingRecipes(false);
      setLoadingButton(false);
    }
  }

  // Show recipe details
  async function showRecipeDetail(id: string) {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
          id
        )}`
      );
      const data = await res.json();
      setSelectedRecipe(data.meals ? data.meals[0] : null);
    } catch (err) {
      console.error(err);
    }
  }

  function closeModal() {
    setSelectedRecipe(null);
  }

  return (
    <>
      <div className="bg-orange-50 min-h-screen">
        {alertMessage && (
          <AlertModal
            message={alertMessage}
            onClose={() => setAlertMessage(null)}
          />
        )}
        <div className="w-full max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold text-center text-black mb-8">
            🍲 Recipe Finder
          </h1>

          {/* Search by food name */}
          <SearchByName
            nameQuery={nameQuery}
            setNameQuery={setNameQuery}
            onSearch={searchByName}
            loading={loadingButton}
          />

          {/* List recipe */}
          <RecipeList
            recipes={recipes}
            loading={loadingRecipes}
            onSelect={showRecipeDetail}
          />
        </div>

        {/* Recipe details modal */}
        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
}
