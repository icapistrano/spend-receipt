import { useEffect, useState } from "react";
import type { Transaction } from "../utils/types";
import { readFileAsText } from "../utils/readFileAsText";
import { parseCsv } from "../utils/parseCsv";
import { parseMonzoCsv } from "../utils/parseMonzoCsv";

export function useTransactions(file: File | null) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!file) return;

    const updateTransactions = async () => {
      const text = await readFileAsText(file!);
      const rows = parseCsv(text);
      const transactions = parseMonzoCsv(rows);
      setTransactions(transactions);
    };

    updateTransactions();
  }, [file]);

  return transactions;
}
