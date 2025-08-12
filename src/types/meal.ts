export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions?: string;
  [key: string]: string | null | undefined;
}

export interface Ingredient {
  strIngredient: string;
}
