export const Dropdown: React.FC<{
  options: string[];
  onChange: (option: string) => void;
}> = ({ options, onChange }) => {
  return (
    <select
      className="
        text-xs
        text-gray-600
        bg-white
        rounded-md
        focus:outline-none
        focus:ring-2
        focus:ring-primary
        focus:border-primary
        p-2
        cursor-pointer
        text-right
        font-semibold
      "
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} className="text-gray-900">
          {option}
        </option>
      ))}
    </select>
  );
};
