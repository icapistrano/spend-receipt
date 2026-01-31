type CategoryFilterProps = {
  categories: string[];
  excludedCategory: string | null;
  onChange: (category: string | null) => void;
};

export function CategoryFilter({
  categories,
  excludedCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-700 font-medium">
        Categories: {categories.length}
      </span>

      <select
        value={excludedCategory ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Include all</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            Exclude: {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
