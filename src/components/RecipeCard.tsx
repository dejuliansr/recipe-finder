import type { Meal } from '../types/meal';

interface Props {
  meal: Meal;
  onClick: () => void;
}

export default function RecipeCard({
  meal,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className="shadow-xl rounded-lg border-2 border-orange-50 hover:border-orange-300 hover:scale-105 cursor-pointer overflow-hidden duration-300 transition"
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-40 object-cover"
      />
      <div className="py-4 px-2">
        <h2 className="font-semibold text-orange-700 text-lg">
          {meal.strMeal}
        </h2>
      </div>
    </div>
  );
}
