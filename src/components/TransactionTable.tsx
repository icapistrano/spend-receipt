import type { Transaction } from "../utils/types";

type TransactionTableProps = {
  transactions: Transaction[];
};

export function TransactionTable({ transactions }: TransactionTableProps) {
  if (transactions.length === 0) {
    return <p className="text-gray-500">No transactions uploaded yet.</p>;
  }

  return (
    <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-200 px-4 py-2 text-left">
            Category
          </th>
          <th className="border border-gray-200 px-4 py-2 text-right">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t, i) => (
          <tr key={i} className="hover:bg-gray-50">
            <td className="border border-gray-200 px-4 py-2">{t.category}</td>
            <td className="border border-gray-200 px-4 py-2 text-right">
              {t.amount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
