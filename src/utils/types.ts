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

export type Dates = {
  startDate: string;
  endDate: string;
};

export type DropdownCategory =
  | "Alphabetical"
  | "Category Count"
  | "Price Ascending"
  | "Price Descending";
