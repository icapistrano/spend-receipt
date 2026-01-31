import { useEffect, useMemo, useState } from "react";
import { CategoryInput } from "./CategoryList/CategoryInput";
import { CsvUpload } from "./CsvUpload";
import { aggregate } from "../utils/aggregate";
import type { Category } from "../pages/MainView";
import { Subheading } from "./Controls/Subheading";
import type { Transaction } from "../utils/types";
import { DatePicker } from "./Controls/DatePicker";
import { useTransactions } from "../hooks/useTransactions";

export const ControlsPanel: React.FC<{
  setRenderedCategories: (categories: Category[]) => void;
}> = ({ setRenderedCategories }) => {
  const [file, setFile] = useState<File | null>(null);
  const tx = useTransactions(file); // source of truth derived from file

  const [txByDate, setTxByDate] = useState<Transaction[]>([]);
  const [dates, setDates] = useState({
    start: null as string | null,
    end: null as string | null,
    min: null as string | null,
    max: null as string | null,
  });

  // Set min/max dates when transactions change
  useEffect(() => {
    if (!tx.length) return;

    const times = tx.map((t) => t.date.getTime());
    const minDate = new Date(Math.min(...times)).toISOString().slice(0, 10);
    const maxDate = new Date(Math.max(...times)).toISOString().slice(0, 10);

    setDates({ start: minDate, end: maxDate, min: minDate, max: maxDate });
  }, [tx]);

  const resetDates = () =>
    setDates((d) => ({ ...d, start: d.min, end: d.max }));

  useEffect(() => {
    if (!dates.start || !dates.end) return;

    const startTs = new Date(dates.start).getTime();
    const endTs = new Date(dates.end).getTime();

    const txByDate = tx.filter((tx) => {
      const ts = tx.date.getTime();
      return ts >= startTs && ts <= endTs;
    });

    setTxByDate(txByDate);
  }, [tx, dates]);

  /** Derived from transactions that fall within start and end dates */
  const categories = useMemo(
    () =>
      aggregate(txByDate).map(({ category, amount, count }) => ({
        title: category,
        numCount: count,
        total: Math.abs(amount),
      })),
    [txByDate],
  );

  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);

  const categorySet = useMemo(
    () => new Set(filteredCategories.map((c) => c.title)),
    [filteredCategories],
  );

  // check all categories if all categories changes e.g. new file upload
  useEffect(() => setFilteredCategories(categories), [categories]);

  const selectAll = () => setFilteredCategories(categories);

  const onToggle = (title: string, isChecked: boolean) => {
    if (isChecked) {
      // Maintain order from `categories`
      setFilteredCategories(() => [
        ...categories.filter(
          (c) => c.title === title || categorySet.has(c.title),
        ),
      ]);
    } else {
      setFilteredCategories((prev) => prev.filter((c) => c.title !== title));
    }
  };

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

          {/* Start and End Date Pickers */}
          {tx.length > 0 && dates.start !== null && dates.end !== null && (
            <section>
              <Subheading
                text="Time Period"
                action={
                  <button
                    type="button"
                    className="text-xs text-primary font-bold hover:underline"
                    onClick={resetDates}
                  >
                    Reset
                  </button>
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <DatePicker
                  label="Start Date"
                  date={dates.start}
                  setDate={(start) => setDates((d) => ({ ...d, start }))}
                  min={dates.min!}
                  max={dates.end}
                />
                <DatePicker
                  label="End Date"
                  date={dates.end}
                  setDate={(end) => setDates((d) => ({ ...d, end }))}
                  max={dates.max!}
                />
              </div>
            </section>
          )}

          {/* Filters Section */}
          {categories.length > 0 && (
            <section>
              <Subheading
                text="Filter Categories"
                action={
                  <button
                    type="button"
                    className="text-xs text-primary font-semibold hover:underline"
                    onClick={selectAll}
                  >
                    Select All
                  </button>
                }
              />

              <div className="space-y-1 bg-primary/5 rounded-xl p-2">
                {/* Category Item */}
                {categories.map(({ title, numCount, total }) => (
                  <CategoryInput
                    key={title}
                    title={title}
                    total={total}
                    numItems={numCount}
                    isChecked={categorySet.has(title)}
                    setIsChecked={(isChecked) => {
                      onToggle(title, isChecked);
                    }}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </aside>
  );
};
