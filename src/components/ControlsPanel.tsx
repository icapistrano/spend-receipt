import { useEffect, useMemo, useState } from "react";
import { CategoryInput } from "./CategoryInput";
import { CsvUpload } from "./CsvUpload";
import { aggregate } from "../utils/aggregate";
import type { Category } from "../pages/MainView";
import { Subheading } from "./Controls/Subheading";
import { readFileAsText } from "../utils/readFileAsText";
import { parseCsv } from "../utils/parseCsv";
import { parseMonzoCsv } from "../utils/parseMonzoCsv";
import type { Transaction } from "../utils/types";
import { DatePicker } from "./Controls/DatePicker";

export const ControlsPanel: React.FC<{
  setRenderedCategories: (categories: Category[]) => void;
}> = ({ setRenderedCategories }) => {
  const [file, setFile] = useState<File | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([]); // source of truth
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  const [categories, setCategories] = useState<Category[]>([]); // source of truth

  const filteredCategories = useMemo(() => {
    const selectedCategories = new Set(
      filteredTransactions.map((t) => t.category),
    );

    return categories.filter((c) => selectedCategories.has(c.title));
  }, [filteredTransactions]);

  const selectAll = () => {
    setFilteredTransactions(transactions);
  };

  const onToggle = (title: string, isChecked: boolean) => {
    if (isChecked) {
      const selectedTransactions = transactions.filter(
        (t) => t.category === title,
      );
      setFilteredTransactions((prev) => [...prev, ...selectedTransactions]);
      return;
    }

    setFilteredTransactions((prev) => prev.filter((t) => t.category !== title));
  };

  useEffect(() => {
    if (!file) return;

    const updateTransactions = async () => {
      const text = await readFileAsText(file!);
      const rows = parseCsv(text);
      const transactions = parseMonzoCsv(rows);
      setTransactions(transactions);
      setFilteredTransactions(transactions);

      // get min and max dates
      const minTx = transactions.reduce((p, c) => {
        return c.date.getTime() < p.date.getTime() ? c : p;
      }, transactions[0]);

      const maxTx = transactions.reduce((p, c) => {
        return c.date.getTime() > p.date.getTime() ? c : p;
      }, transactions[0]);

      setStartDate(minTx.date.toISOString().slice(0, 10));
      setEndDate(maxTx.date.toISOString().slice(0, 10));

      console.log(minTx.date.toISOString().slice(0, 10));

      const categories = aggregate(transactions).map(
        ({ category, amount, count }) => ({
          title: category,
          numCount: count,
          total: Math.abs(amount),
          isChecked: true,
        }),
      );

      setCategories(categories);
    };

    updateTransactions();
  }, [file]);

  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-01-31");

  // agreggate here for pickers
  useEffect(() => {
    const _startDate = new Date(startDate);
    const _endDate = new Date(endDate);

    const startTs = _startDate.getTime();
    const endTs = _endDate.getTime();

    const filteredTransactions = transactions.filter((tx) => {
      const ts = tx.date.getTime();
      return ts >= startTs && ts <= endTs;
    });

    setFilteredTransactions(filteredTransactions);
  }, [transactions, startDate, endDate]);

  // Update reciept preview
  useEffect(() => {
    setRenderedCategories(filteredCategories);
  }, [filteredCategories]);

  return (
    <aside className="w-full h-full lg:w-[480px] flex flex-col border-l border-[#e8ced3]">
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[#f4e7e9]">
          <h1 className="text-xl font-bold">Data Controls</h1>
          <p className="text-[#9c4957] text-sm">
            Manage your receipt visualisation
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Upload Section */}
          <CsvUpload onUpload={setFile} />

          {/* Filters Section */}
          {categories.length > 0 && (
            <>
              {/* Start and End Date Pickers */}
              <section>
                <Subheading text="Time Period" />
                <div className="grid grid-cols-2 gap-4">
                  <DatePicker
                    label="Start Date"
                    date={startDate}
                    setDate={setStartDate}
                  />
                  <DatePicker
                    label="End Date"
                    date={endDate}
                    setDate={setEndDate}
                  />
                </div>
              </section>

              {/* Category List */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <Subheading text="Filter Categories" />
                  <button
                    type="button"
                    className="text-xs text-primary font-bold hover:underline"
                    onClick={selectAll}
                  >
                    Select All
                  </button>
                </div>

                <div className="space-y-1 bg-primary/5 rounded-xl p-2">
                  {/* Category Item */}
                  {categories.map(({ title, numCount, total }) => (
                    <CategoryInput
                      key={title}
                      title={title}
                      total={total}
                      numItems={numCount}
                      isChecked={Boolean(
                        filteredCategories.find((c) => c.title === title),
                      )}
                      setIsChecked={(isChecked) => {
                        onToggle(title, isChecked);
                      }}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};
