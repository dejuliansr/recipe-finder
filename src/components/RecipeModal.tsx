import { useEffect, useState } from 'react';
import type { Meal } from '../types/meal';

interface Props {
  recipe: Meal;
  onClose: () => void;
}

export default function RecipeModal({
  recipe,
  onClose,
}: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(t);
  }, []);

  function handleClose() {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }

  return (
    <div
      className={`fixed inset-0 bg-gray-200/50 flex items-center justify-center p-4 transition-all duration-300 ${
        show ? 'backdrop-blur-sm' : 'backdrop-blur-0'
      }`}
    >
      <div
        className={`bg-orange-50 max-w-lg w-full p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative transform transition-all duration-300 ${
          show
            ? 'scale-100 opacity-100'
            : 'scale-95 opacity-0'
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-red-500 font-bold text-xl hover:text-red-700 hover:scale-125 duration-300 transition-transform cursor-pointer"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-orange-700">
          {recipe.strMeal}
        </h2>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-60 object-cover rounded mb-4"
        />

        <h3 className="font-semibold text-orange-800 mb-2">
          Ingredients:
        </h3>
        <ul className="list-disc text-orange-900 pl-5 mb-4">
          {Array.from({ length: 20 }, (_, i) => {
            const ingredient =
              recipe[`strIngredient${i + 1}`];
            const measure = recipe[`strMeasure${i + 1}`];
            return ingredient ? (
              <li key={i}>
                {ingredient} - {measure}
              </li>
            ) : null;
          })}
        </ul>

        {recipe.strInstructions && (
          <>
            <h3 className="font-semibold  text-orange-800 mb-2">
              Instructions:
            </h3>
            <p className="text-sm text-orange-900 leading-relaxed whitespace-pre-line">
              {recipe.strInstructions}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
