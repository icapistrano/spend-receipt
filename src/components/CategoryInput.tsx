export const CategoryInput: React.FC<{
  title: string;
  total: number;
  numItems: number;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}> = ({ title, total, numItems, isChecked, setIsChecked }) => {
  return (
    <label className="flex items-center gap-x-3 p-3 hover:bg-white rounded-lg transition-colors cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        className="h-5 w-5 rounded border-4 border-primary accent-primary focus:ring-primary focus:ring-offset-0"
        onChange={(e) => setIsChecked(e.target.checked)}
      />

      <div className="flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-gray-400">
          {numItems} {numItems === 1 ? "item" : "items"}
        </p>
      </div>
      <span className="text-sm text-gray-400 tracking-widest">£{total}</span>
    </label>
  );
};
