import type { Meal } from '../types/meal';
import RecipeCard from './RecipeCard';

interface Props {
  recipes: Meal[];
  loading: boolean;
  onSelect: (id: string) => void;
}

export default function RecipeList({
  recipes,
  loading,
  onSelect,
}: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg shadow animate-pulse"
          >
            <div className="w-full h-40 bg-gray-300"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <p className="text-center text-gray-500 col-span-full">
        No recipes found. Search for something!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
      {recipes.map((meal) => (
        <RecipeCard
          key={meal.idMeal}
          meal={meal}
          onClick={() => onSelect(meal.idMeal)}
        />
      ))}
    </div>
  );
}
