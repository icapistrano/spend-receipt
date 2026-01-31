import { useState } from "react";
import { readFileAsText } from "../utils/readFileAsText";
import { parseCsv } from "../utils/parseCsv";
import { parseMonzoCsv } from "../utils/parseMonzoCsv";
import type { Transaction } from "../utils/types";

export const Form: React.FC<{
  onSubmit: (transactions: Transaction[]) => void;
}> = ({ onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!file) return;

    // parse csv
    const text = await readFileAsText(file);
    const rows = parseCsv(text);
    const transactions = parseMonzoCsv(rows);
    onSubmit(transactions);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="max-w-md p-6 bg-white border border-gray-200 rounded-2xl shadow-md flex flex-col gap-4"
    >
      <fieldset>
        <label className="font-medium text-gray-700">Select CSV</label>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="
            block w-full
            text-gray-700
            rounded-md
            border border-gray-300
            cursor-pointer
            file:mr-4 file:py-2 file:px-4
            file:border-0
            file:bg-blue-600 file:text-white
            file:font-semibold file:hover:bg-blue-700
            file:transition-colors file:duration-150
            focus:outline-none focus:ring-2 focus:ring-blue-400
          "
        />
      </fieldset>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-150"
        onClick={handleSubmit}
      >
        Upload
      </button>
    </form>
  );
};
