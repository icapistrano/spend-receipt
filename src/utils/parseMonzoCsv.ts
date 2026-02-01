import type { Transaction } from "./types";

export function parseMonzoCsv(rows: string[][]): Transaction[] {
  if (rows.length < 2) return [];

  const [header, ...data] = rows;

  // Find the indexes of the columns we care about
  const amountIdx = header.indexOf("Money Out");
  const categoryIdx = header.indexOf("Category");
  const dateIdx = header.indexOf("Date");

  if (amountIdx === -1 || categoryIdx === -1 || dateIdx === -1) {
    throw new Error("Monzo CSV is missing required columns.");
  }

  return data
    .map((row) => {
      const rawAmount = row[amountIdx];
      const date = row[dateIdx];

      // Skip empty rows
      if (!rawAmount) return null;

      return {
        category: row[categoryIdx],
        amount: Number(rawAmount),
        date: parseMonzoDate(date),
      } as Transaction;
    })
    .filter((tx) => tx !== null)
    .filter((tx) => tx.amount !== 0); // Handle pending authorization
}

function parseMonzoDate(dateStr: string): Date {
  const [day, month, year] = dateStr.trim().split("/").map(Number);
  return new Date(year, month - 1, day);
}
