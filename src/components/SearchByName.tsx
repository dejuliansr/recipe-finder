interface Props {
  nameQuery: string;
  setNameQuery: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function SearchByName({
  nameQuery,
  setNameQuery,
  onSearch,
  loading,
}: Props) {
  return (
    <div className="flex gap-3 mb-5 md:mb-8">
      <input
        type="text"
        placeholder="Search by food name..."
        value={nameQuery}
        onChange={(e) => setNameQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        className="flex-1 p-3 text-orange-900 font-bold rounded-lg shadow-xl focus:ring-2 focus:ring-orange-400 outline-none"
        
      />
      <button
        onClick={onSearch}
        className="w-20 md:w-30 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-500 shadow-sm transition flex items-center justify-center cursor-pointer"
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
