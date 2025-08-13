import { useEffect, useState } from 'react';
import './App.css';

import type { Ingredient, Meal } from './types/meal';
import SearchByName from './components/SearchByName';
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal';
import AlertModal from './components/AlertModal';
import IngredientSearch from './components/IngredientSearch';

export default function App() {
  const [nameQuery, setNameQuery] = useState('');
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [selectedRecipe, setSelectedRecipe] =
    useState<Meal | null>(null);
  const [loadingRecipes, setLoadingRecipes] =
    useState(false);
  const [loadingName, setLoadingName] = useState(false);
  const [loadingIngredient, setLoadingIngredient] =
    useState(false);

  const [ingredientList, setIngredientList] = useState<
    string[]
  >([]);
  const [ingredientQuery, setIngredientQuery] =
    useState('');
  const [selectedIngredients, setSelectedIngredients] =
    useState<string[]>([]);
  const [filteredIngredients, setFilteredIngredients] =
    useState<string[]>([]);
  const [alertMessage, setAlertMessage] = useState<
    string | null
  >(null);

  useEffect(() => {
    fetch(
      'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.meals) {
          setIngredientList(
            data.meals.map(
              (item: Ingredient) => item.strIngredient
            )
          );
        }
      })
      .catch((err) =>
        console.error('Gagal ambil daftar bahan:', err)
      );
  }, []);

  useEffect(() => {
    if (!ingredientQuery.trim()) {
      setFilteredIngredients([]);
      return;
    }
    const q = ingredientQuery.toLowerCase();
    const filtered = ingredientList
      .filter((ing) => ing.toLowerCase().includes(q))
      .filter((ing) => !selectedIngredients.includes(ing))
      .slice(0, 10);
    setFilteredIngredients(filtered);
  }, [
    ingredientQuery,
    ingredientList,
    selectedIngredients,
  ]);

  // Search by food name
  async function searchByName() {
    if (!nameQuery.trim()) {
      setAlertMessage('Please enter a food name!');
      return;
    }
    try {
      setLoadingRecipes(true);
      setLoadingName(true);
      setLoadingIngredient(false);
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          nameQuery
        )}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);

      // Clear input ingredient search
      setIngredientQuery('');
      setSelectedIngredients([]);
      setFilteredIngredients([]);
    } catch (err) {
      console.error(err);
      setRecipes([]);
    } finally {
      setLoadingRecipes(false);
      setLoadingName(false);
    }
  }

  // Search by ingredients
  async function searchByIngredients() {
    if (selectedIngredients.length === 0) {
      setAlertMessage('Please enter a ingredients!');
      return;
    }
    try {
      setLoadingRecipes(true);
      setLoadingIngredient(true);
      setLoadingName(false);

      let intersection: Meal[] | null = null;
      for (const ing of selectedIngredients) {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
            ing
          )}`
        );
        const data = await res.json();
        const meals: Meal[] = data.meals || [];

        if (intersection === null) {
          intersection = meals;
        } else {
          const ids = new Set(meals.map((m) => m.idMeal));
          intersection = intersection.filter((m) =>
            ids.has(m.idMeal)
          );
        }

        if (intersection.length === 0) break;
      }

      setRecipes(intersection || []);

      // Clear input name search
      setNameQuery('');
    } catch (err) {
      console.error('Error searchByIngredients:', err);
      setRecipes([]);
    } finally {
      setLoadingRecipes(false);
      setLoadingIngredient(false);
    }
  }

  // Add ingredient
  function addIngredient(ingredient: string) {
    const ing = ingredient.trim();
    if (!ing) return;
    if (!selectedIngredients.includes(ing)) {
      setSelectedIngredients((prev) => [...prev, ing]);
    }
    setIngredientQuery('');
    setFilteredIngredients([]);
  }

  // Delete ingredient
  function removeIngredient(ingredient: string) {
    setSelectedIngredients((prev) =>
      prev.filter((ing) => ing !== ingredient)
    );
  }

  // Delete all ingredient
  function clearAllIngredients() {
    setSelectedIngredients([]);
    setIngredientQuery('');
    setFilteredIngredients([]);
  }

  function handleIngredientKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredIngredients.length > 0) {
        addIngredient(filteredIngredients[0]);
      } else if (ingredientQuery.trim()) {
        addIngredient(ingredientQuery.trim());
      }
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
        <div className="w-full max-w-7xl mx-auto py-10 px-5">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-900 mb-1 md:mb-2">
              Pantry To Plate
            </h1>
            <p className="text-orange-800 text-sm md:text-lg">
              From Pantry Staples to Delicious Plates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
            <div className="">
              {/* Search by food name */}
              <SearchByName
                nameQuery={nameQuery}
                setNameQuery={setNameQuery}
                onSearch={searchByName}
                loading={loadingName}
              />

              {/* List recipe */}
              <RecipeList
                recipes={recipes}
                loading={loadingRecipes}
                onSelect={showRecipeDetail}
              />
            </div>

            <div>
              {/* Search by ingredient name */}
              <IngredientSearch
                ingredientQuery={ingredientQuery}
                setIngredientQuery={setIngredientQuery}
                filteredIngredients={filteredIngredients}
                selectedIngredients={selectedIngredients}
                addIngredient={addIngredient}
                removeIngredient={removeIngredient}
                clearAllIngredients={clearAllIngredients}
                onSearch={searchByIngredients}
                loading={loadingIngredient}
                handleIngredientKeyDown={
                  handleIngredientKeyDown
                }
              />
            </div>
          </div>
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
