import type { CategoryTransaction, Transaction } from "./types";

export function aggregate(transaction: Transaction[]): CategoryTransaction[] {
  const dataByCategoryId = new Map<
    string,
    { numCount: number; amount: number }
  >();

  for (const tx of transaction) {
    const data = dataByCategoryId.get(tx.category);
    if (!data) {
      dataByCategoryId.set(tx.category, { numCount: 1, amount: tx.amount });
      continue;
    }

    data.numCount += 1;
    data.amount += tx.amount;
  }

  return Array.from(dataByCategoryId.entries()).map(
    ([category, { numCount, amount }]) => ({
      category,
      count: numCount,
      amount: Number(amount.toFixed(2)),
    }),
  );
}
