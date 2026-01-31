import { useState } from "react";
import type { Transaction } from "../utils/types";
import { CategoryFilter } from "./CategoryFilter";
import { TransactionTable } from "./TransactionTable";

export const TransactionDashboard: React.FC<{
  transactions: Transaction[];
}> = ({ transactions }) => {
  const [visibleTransactions] = useState(transactions);
  const [excludedCategory, setExcludedCategory] = useState<string | null>(null);

  // Compute categories dynamically
  const categories = Array.from(new Set(transactions.map((t) => t.category)));

  // Filter transactions
  const filteredTransactions = excludedCategory
    ? visibleTransactions.filter((t) => t.category !== excludedCategory)
    : visibleTransactions;

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
      {/* Category filter */}
      <CategoryFilter
        categories={categories}
        excludedCategory={excludedCategory}
        onChange={setExcludedCategory}
      />

      {/* Transactions table */}
      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
};
