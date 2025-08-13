interface Props {
  ingredientQuery: string;
  setIngredientQuery: (value: string) => void;
  filteredIngredients: string[];
  selectedIngredients: string[];
  addIngredient: (ing: string) => void;
  removeIngredient: (ing: string) => void;
  clearAllIngredients: () => void;
  onSearch: () => void;
  loading: boolean;
  handleIngredientKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => void;
}

export default function IngredientSearch({
  ingredientQuery,
  setIngredientQuery,
  filteredIngredients,
  selectedIngredients,
  addIngredient,
  removeIngredient,
  clearAllIngredients,
  onSearch,
  loading,
  handleIngredientKeyDown,
}: Props) {
  return (
    <div className="bg-orange-50 p-4 rounded-xl shadow-md">
      <h2 className="text-xl text-orange-900 font-semibold mb-3">
        Search by ingredient
      </h2>

      <input
        type="text"
        placeholder="ingredient..."
        value={ingredientQuery}
        onChange={(e) => setIngredientQuery(e.target.value)}
        onKeyDown={handleIngredientKeyDown}
        className="w-full text-orange-900 font-bold p-2 rounded-lg shadow-lg focus:ring-2 focus:ring-orange-400 outline-none"
      />

      {filteredIngredients.length > 0 && (
        <ul className="border mt-2 rounded-lg bg-white shadow-sm max-h-40 overflow-y-auto">
          {filteredIngredients.map((ing) => (
            <li
              key={ing}
              onClick={() => addIngredient(ing)}
              className="p-2 hover:bg-blue-100 cursor-pointer"
            >
              {ing}
            </li>
          ))}
        </ul>
      )}
      {selectedIngredients.length > 0 && (
        <p
          onClick={clearAllIngredients}
          className="mt-2 text-sm text-orange-600 hover:underline cursor-pointer select-none"
        >
          Clear All
        </p>
      )}

      <div className="flex flex-wrap mt-4 gap-2">
        {selectedIngredients.map((ing) => (
          <span
            key={ing}
            className="bg-white text-orange-900 font-semibold pl-3 p-1 flex items-center rounded-md gap-2"
          >
            {ing}
            <button
              onClick={() => removeIngredient(ing)}
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-2 rounded-md cursor-pointer"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <button
        onClick={onSearch}
        className="mt-4 w-full px-4 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-500 shadow-sm transition flex items-center justify-center cursor-pointer"
        disabled={loading}
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          'Search'
        )}
      </button>
    </div>
  );
}
