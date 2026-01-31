export type Transaction = {
  category: string;
  amount: number;
  date: Date;
};

export type CategoryTransaction = {
  category: string;
  amount: number;
  count: number;
};
