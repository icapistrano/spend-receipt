import type { Category } from "../pages/MainView";
import type { DropdownCategory } from "./types";

export const dropdownFns: Record<
  DropdownCategory,
  (a: Category, b: Category) => number
> = {
  ["Alphabetical"]: (a, b) => a.title.localeCompare(b.title),
  ["Category Count"]: (a, b) => b.numCount - a.numCount,
  ["Price Ascending"]: (a, b) => a.total - b.total,
  ["Price Descending"]: (a, b) => b.total - a.total,
};
