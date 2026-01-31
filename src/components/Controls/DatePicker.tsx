export const DatePicker: React.FC<{
  label: string;
  date: string;
  setDate: (date: string) => void;
  min?: string;
  max?: string;
}> = ({ label, date, setDate, min, max }) => {
  return (
    <div className="flex flex-col gap-0">
      <label className="text-sm text-gray-500 mb-1" htmlFor={`${label}-input`}>
        {label}
      </label>
      <div className="relative group">
        <input
          id={`${label}-input`}
          type="date"
          min={min}
          max={max}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-background-light border border-[#e8ced3] rounded-lg px-3 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer"
        />
      </div>
    </div>
  );
};
